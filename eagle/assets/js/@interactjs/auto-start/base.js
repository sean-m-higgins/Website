import * as utils from '@interactjs/utils';
import InteractableMethods from './InteractableMethods';
function install(scope) {
    const { interact, interactions, defaults, } = scope;
    scope.usePlugin(InteractableMethods);
    // set cursor style on mousedown
    interactions.signals.on('down', ({ interaction, pointer, event, eventTarget }) => {
        if (interaction.interacting()) {
            return;
        }
        const actionInfo = getActionInfo(interaction, pointer, event, eventTarget, scope);
        prepare(interaction, actionInfo, scope);
    });
    // set cursor style on mousemove
    interactions.signals.on('move', ({ interaction, pointer, event, eventTarget }) => {
        if (interaction.pointerType !== 'mouse' ||
            interaction.pointerIsDown ||
            interaction.interacting()) {
            return;
        }
        const actionInfo = getActionInfo(interaction, pointer, event, eventTarget, scope);
        prepare(interaction, actionInfo, scope);
    });
    interactions.signals.on('move', (arg) => {
        const { interaction } = arg;
        if (!interaction.pointerIsDown ||
            interaction.interacting() ||
            !interaction.pointerWasMoved ||
            !interaction.prepared.name) {
            return;
        }
        scope.autoStart.signals.fire('before-start', arg);
        const { interactable } = interaction;
        if (interaction.prepared.name && interactable) {
            // check manualStart and interaction limit
            if (interactable.options[interaction.prepared.name].manualStart ||
                !withinInteractionLimit(interactable, interaction.element, interaction.prepared, scope)) {
                interaction.stop();
            }
            else {
                interaction.start(interaction.prepared, interactable, interaction.element);
            }
        }
    });
    interactions.signals.on('stop', ({ interaction }) => {
        const { interactable } = interaction;
        if (interactable && interactable.options.styleCursor) {
            setCursor(interaction.element, '', scope);
        }
    });
    defaults.base.actionChecker = null;
    defaults.base.styleCursor = true;
    utils.extend(defaults.perAction, {
        manualStart: false,
        max: Infinity,
        maxPerElement: 1,
        allowFrom: null,
        ignoreFrom: null,
        // only allow left button by default
        // see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons#Return_value
        mouseButtons: 1,
    });
    /**
     * Returns or sets the maximum number of concurrent interactions allowed.  By
     * default only 1 interaction is allowed at a time (for backwards
     * compatibility). To allow multiple interactions on the same Interactables and
     * elements, you need to enable it in the draggable, resizable and gesturable
     * `'max'` and `'maxPerElement'` options.
     *
     * @alias module:interact.maxInteractions
     *
     * @param {number} [newValue] Any number. newValue <= 0 means no interactions.
     */
    interact.maxInteractions = (newValue) => maxInteractions(newValue, scope);
    scope.autoStart = {
        // Allow this many interactions to happen simultaneously
        maxInteractions: Infinity,
        withinInteractionLimit,
        cursorElement: null,
        signals: new utils.Signals(),
    };
}
// Check if the current interactable supports the action.
// If so, return the validated action. Otherwise, return null
function validateAction(action, interactable, element, eventTarget, scope) {
    if (interactable.testIgnoreAllow(interactable.options[action.name], element, eventTarget) &&
        interactable.options[action.name].enabled &&
        withinInteractionLimit(interactable, element, action, scope)) {
        return action;
    }
    return null;
}
function validateMatches(interaction, pointer, event, matches, matchElements, eventTarget, scope) {
    for (let i = 0, len = matches.length; i < len; i++) {
        const match = matches[i];
        const matchElement = matchElements[i];
        const matchAction = match.getAction(pointer, event, interaction, matchElement);
        if (!matchAction) {
            continue;
        }
        const action = validateAction(matchAction, match, matchElement, eventTarget, scope);
        if (action) {
            return {
                action,
                interactable: match,
                element: matchElement,
            };
        }
    }
    return { action: null, interactable: null, element: null };
}
function getActionInfo(interaction, pointer, event, eventTarget, scope) {
    let matches = [];
    let matchElements = [];
    let element = eventTarget;
    function pushMatches(interactable) {
        matches.push(interactable);
        matchElements.push(element);
    }
    while (utils.is.element(element)) {
        matches = [];
        matchElements = [];
        scope.interactables.forEachMatch(element, pushMatches);
        const actionInfo = validateMatches(interaction, pointer, event, matches, matchElements, eventTarget, scope);
        if (actionInfo.action &&
            !actionInfo.interactable.options[actionInfo.action.name].manualStart) {
            return actionInfo;
        }
        element = utils.dom.parentNode(element);
    }
    return { action: null, interactable: null, element: null };
}
function prepare(interaction, { action, interactable, element }, scope) {
    action = action || {};
    if (interaction.interactable && interaction.interactable.options.styleCursor) {
        setCursor(interaction.element, '', scope);
    }
    interaction.interactable = interactable;
    interaction.element = element;
    utils.copyAction(interaction.prepared, action);
    interaction.rect = interactable && action.name
        ? interactable.getRect(element)
        : null;
    if (interactable && interactable.options.styleCursor) {
        const cursor = action ? scope.actions[action.name].getCursor(action) : '';
        setCursor(interaction.element, cursor, scope);
    }
    scope.autoStart.signals.fire('prepared', { interaction });
}
function withinInteractionLimit(interactable, element, action, scope) {
    const options = interactable.options;
    const maxActions = options[action.name].max;
    const maxPerElement = options[action.name].maxPerElement;
    const autoStartMax = scope.autoStart.maxInteractions;
    let activeInteractions = 0;
    let interactableCount = 0;
    let elementCount = 0;
    // no actions if any of these values == 0
    if (!(maxActions && maxPerElement && autoStartMax)) {
        return false;
    }
    for (const interaction of scope.interactions.list) {
        const otherAction = interaction.prepared.name;
        if (!interaction.interacting()) {
            continue;
        }
        activeInteractions++;
        if (activeInteractions >= autoStartMax) {
            return false;
        }
        if (interaction.interactable !== interactable) {
            continue;
        }
        interactableCount += otherAction === action.name ? 1 : 0;
        if (interactableCount >= maxActions) {
            return false;
        }
        if (interaction.element === element) {
            elementCount++;
            if (otherAction === action.name && elementCount >= maxPerElement) {
                return false;
            }
        }
    }
    return autoStartMax > 0;
}
function maxInteractions(newValue, scope) {
    if (utils.is.number(newValue)) {
        scope.autoStart.maxInteractions = newValue;
        return this;
    }
    return scope.autoStart.maxInteractions;
}
function setCursor(element, cursor, scope) {
    if (scope.autoStart.cursorElement) {
        scope.autoStart.cursorElement.style.cursor = '';
    }
    element.ownerDocument.documentElement.style.cursor = cursor;
    element.style.cursor = cursor;
    scope.autoStart.cursorElement = cursor ? element : null;
}
export default {
    id: 'auto-start/base',
    install,
    maxInteractions,
    withinInteractionLimit,
    validateAction,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxtQkFBbUIsQ0FBQTtBQUMxQyxPQUFPLG1CQUFtQixNQUFNLHVCQUF1QixDQUFBO0FBMEN2RCxTQUFTLE9BQU8sQ0FBRSxLQUFxQjtJQUNyQyxNQUFNLEVBQ0osUUFBUSxFQUNSLFlBQVksRUFDWixRQUFRLEdBQ1QsR0FBRyxLQUFLLENBQUE7SUFFVCxLQUFLLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUE7SUFFcEMsZ0NBQWdDO0lBQ2hDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRTtRQUMvRSxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUFFLE9BQU07U0FBRTtRQUV6QyxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ2pGLE9BQU8sQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3pDLENBQUMsQ0FBQyxDQUFBO0lBRUYsZ0NBQWdDO0lBQ2hDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRTtRQUMvRSxJQUFJLFdBQVcsQ0FBQyxXQUFXLEtBQUssT0FBTztZQUNuQyxXQUFXLENBQUMsYUFBYTtZQUN6QixXQUFXLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFBRSxPQUFNO1NBQUU7UUFFekMsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsS0FBSyxF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QUksV0FBVyxLQUFLLE1BQU0sQ0FBQyxJQUFJLElBQUksWUFBWSxJQUFJLGFBQWEsRUFBRTtnQkFDaEUsT0FBTyxLQUFLLENBQUE7YUFDYjtTQUNGO0tBQ0Y7SUFFRCxPQUFPLFlBQVksR0FBRyxDQUFDLENBQUE7QUFDekIsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFFLFFBQVEsRUFBRSxLQUFxQjtJQUN2RCxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzdCLEtBQUssQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQTtRQUUxQyxPQUFPLElBQUksQ0FBQTtLQUNaO0lBRUQsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQTtBQUN4QyxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUUsT0FBb0IsRUFBRSxNQUFNLEVBQUUsS0FBcUI7SUFDckUsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRTtRQUNqQyxLQUFLLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtLQUNoRDtJQUVELE9BQU8sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQzNELE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUM3QixLQUFLLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0FBQ3pELENBQUM7QUFFRCxlQUFlO0lBQ2IsRUFBRSxFQUFFLGlCQUFpQjtJQUNyQixPQUFPO0lBQ1AsZUFBZTtJQUNmLHNCQUFzQjtJQUN0QixjQUFjO0NBQ0ksQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHV0aWxzIGZyb20gJ0BpbnRlcmFjdGpzL3V0aWxzJ1xuaW1wb3J0IEludGVyYWN0YWJsZU1ldGhvZHMgZnJvbSAnLi9JbnRlcmFjdGFibGVNZXRob2RzJ1xuXG5kZWNsYXJlIG1vZHVsZSAnQGludGVyYWN0anMvaW50ZXJhY3QvaW50ZXJhY3QnIHtcbiAgaW50ZXJmYWNlIEludGVyYWN0U3RhdGljIHtcbiAgICBtYXhJbnRlcmFjdGlvbnM6IChuZXdWYWx1ZTogYW55KSA9PiBhbnlcbiAgfVxufVxuXG5kZWNsYXJlIG1vZHVsZSAnQGludGVyYWN0anMvY29yZS9zY29wZScge1xuICBpbnRlcmZhY2UgU2NvcGUge1xuICAgIGF1dG9TdGFydDogQXV0b1N0YXJ0XG4gICAgbWF4SW50ZXJhY3Rpb25zOiAoLi4uYXJnczogYW55KSA9PiBhbnlcbiAgfVxufVxuXG5kZWNsYXJlIG1vZHVsZSAnQGludGVyYWN0anMvY29yZS9kZWZhdWx0T3B0aW9ucycge1xuICBpbnRlcmZhY2UgQmFzZURlZmF1bHRzIHtcbiAgICBhY3Rpb25DaGVja2VyP1xuICAgIHN0eWxlQ3Vyc29yP1xuICB9XG5cbiAgaW50ZXJmYWNlIFBlckFjdGlvbkRlZmF1bHRzIHtcbiAgICBtYW51YWxTdGFydD86IGJvb2xlYW5cbiAgICBtYXg/OiBudW1iZXJcbiAgICBtYXhQZXJFbGVtZW50PzogbnVtYmVyXG4gICAgYWxsb3dGcm9tPzogc3RyaW5nIHwgRWxlbWVudFxuICAgIGlnbm9yZUZyb20/OiBzdHJpbmcgfCBFbGVtZW50XG5cbiAgICAvLyBvbmx5IGFsbG93IGxlZnQgYnV0dG9uIGJ5IGRlZmF1bHRcbiAgICAvLyBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01vdXNlRXZlbnQvYnV0dG9ucyNSZXR1cm5fdmFsdWVcbiAgICBtb3VzZUJ1dHRvbnM/OiAwIHwgMSB8IDIgfCA0IHwgMTZcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEF1dG9TdGFydCB7XG4gIC8vIEFsbG93IHRoaXMgbWFueSBpbnRlcmFjdGlvbnMgdG8gaGFwcGVuIHNpbXVsdGFuZW91c2x5XG4gIG1heEludGVyYWN0aW9uczogbnVtYmVyXG4gIHdpdGhpbkludGVyYWN0aW9uTGltaXQ6IHR5cGVvZiB3aXRoaW5JbnRlcmFjdGlvbkxpbWl0XG4gIGN1cnNvckVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIHNpZ25hbHM6IHV0aWxzLlNpZ25hbHNcbn1cblxuZnVuY3Rpb24gaW5zdGFsbCAoc2NvcGU6IEludGVyYWN0LlNjb3BlKSB7XG4gIGNvbnN0IHtcbiAgICBpbnRlcmFjdCxcbiAgICBpbnRlcmFjdGlvbnMsXG4gICAgZGVmYXVsdHMsXG4gIH0gPSBzY29wZVxuXG4gIHNjb3BlLnVzZVBsdWdpbihJbnRlcmFjdGFibGVNZXRob2RzKVxuXG4gIC8vIHNldCBjdXJzb3Igc3R5bGUgb24gbW91c2Vkb3duXG4gIGludGVyYWN0aW9ucy5zaWduYWxzLm9uKCdkb3duJywgKHsgaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCB9KSA9PiB7XG4gICAgaWYgKGludGVyYWN0aW9uLmludGVyYWN0aW5nKCkpIHsgcmV0dXJuIH1cblxuICAgIGNvbnN0IGFjdGlvbkluZm8gPSBnZXRBY3Rpb25JbmZvKGludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgZXZlbnRUYXJnZXQsIHNjb3BlKVxuICAgIHByZXBhcmUoaW50ZXJhY3Rpb24sIGFjdGlvbkluZm8sIHNjb3BlKVxuICB9KVxuXG4gIC8vIHNldCBjdXJzb3Igc3R5bGUgb24gbW91c2Vtb3ZlXG4gIGludGVyYWN0aW9ucy5zaWduYWxzLm9uKCdtb3ZlJywgKHsgaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCB9KSA9PiB7XG4gICAgaWYgKGludGVyYWN0aW9uLnBvaW50ZXJUeXBlICE9PSAnbW91c2UnIHx8XG4gICAgICAgIGludGVyYWN0aW9uLnBvaW50ZXJJc0Rvd24gfHxcbiAgICAgICAgaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSkgeyByZXR1cm4gfVxuXG4gICAgY29uc3QgYWN0aW9uSW5mbyA9IGdldEFjdGlvbkluZm8oaW50ZXJhY3Rpb24sIHBvaW50ZXIsIGV2ZW50LCBldmVudFRhcmdldCwgc2NvcGUpXG4gICAgcHJlcGFyZShpbnRlcmFjdGlvbiwgYWN0aW9uSW5mbywgc2NvcGUpXG4gIH0pXG5cbiAgaW50ZXJhY3Rpb25zLnNpZ25hbHMub24oJ21vdmUnLCAoYXJnKSA9PiB7XG4gICAgY29uc3QgeyBpbnRlcmFjdGlvbiB9ID0gYXJnXG5cbiAgICBpZiAoIWludGVyYWN0aW9uLnBvaW50ZXJJc0Rvd24gfHxcbiAgICAgICAgaW50ZXJhY3Rpb24uaW50ZXJhY3RpbmcoKSB8fFxuICAgICAgICAhaW50ZXJhY3Rpb24ucG9pbnRlcldhc01vdmVkIHx8XG4gICAgICAgICFpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzY29wZS5hdXRvU3RhcnQuc2lnbmFscy5maXJlKCdiZWZvcmUtc3RhcnQnLCBhcmcpXG5cbiAgICBjb25zdCB7IGludGVyYWN0YWJsZSB9ID0gaW50ZXJhY3Rpb25cblxuICAgIGlmIChpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lICYmIGludGVyYWN0YWJsZSkge1xuICAgICAgLy8gY2hlY2sgbWFudWFsU3RhcnQgYW5kIGludGVyYWN0aW9uIGxpbWl0XG4gICAgICBpZiAoaW50ZXJhY3RhYmxlLm9wdGlvbnNbaW50ZXJhY3Rpb24ucHJlcGFyZWQubmFtZV0ubWFudWFsU3RhcnQgfHxcbiAgICAgICAgICAhd2l0aGluSW50ZXJhY3Rpb25MaW1pdChpbnRlcmFjdGFibGUsIGludGVyYWN0aW9uLmVsZW1lbnQsIGludGVyYWN0aW9uLnByZXBhcmVkLCBzY29wZSkpIHtcbiAgICAgICAgaW50ZXJhY3Rpb24uc3RvcCgpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaW50ZXJhY3Rpb24uc3RhcnQoaW50ZXJhY3Rpb24ucHJlcGFyZWQsIGludGVyYWN0YWJsZSwgaW50ZXJhY3Rpb24uZWxlbWVudClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgaW50ZXJhY3Rpb25zLnNpZ25hbHMub24oJ3N0b3AnLCAoeyBpbnRlcmFjdGlvbiB9KSA9PiB7XG4gICAgY29uc3QgeyBpbnRlcmFjdGFibGUgfSA9IGludGVyYWN0aW9uXG5cbiAgICBpZiAoaW50ZXJhY3RhYmxlICYmIGludGVyYWN0YWJsZS5vcHRpb25zLnN0eWxlQ3Vyc29yKSB7XG4gICAgICBzZXRDdXJzb3IoaW50ZXJhY3Rpb24uZWxlbWVudCBhcyBIVE1MRWxlbWVudCwgJycsIHNjb3BlKVxuICAgIH1cbiAgfSlcblxuICBkZWZhdWx0cy5iYXNlLmFjdGlvbkNoZWNrZXIgPSBudWxsXG4gIGRlZmF1bHRzLmJhc2Uuc3R5bGVDdXJzb3IgPSB0cnVlXG5cbiAgdXRpbHMuZXh0ZW5kKGRlZmF1bHRzLnBlckFjdGlvbiwge1xuICAgIG1hbnVhbFN0YXJ0OiBmYWxzZSxcbiAgICBtYXg6IEluZmluaXR5LFxuICAgIG1heFBlckVsZW1lbnQ6IDEsXG4gICAgYWxsb3dGcm9tOiAgbnVsbCxcbiAgICBpZ25vcmVGcm9tOiBudWxsLFxuXG4gICAgLy8gb25seSBhbGxvdyBsZWZ0IGJ1dHRvbiBieSBkZWZhdWx0XG4gICAgLy8gc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Nb3VzZUV2ZW50L2J1dHRvbnMjUmV0dXJuX3ZhbHVlXG4gICAgbW91c2VCdXR0b25zOiAxLFxuICB9KVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG9yIHNldHMgdGhlIG1heGltdW0gbnVtYmVyIG9mIGNvbmN1cnJlbnQgaW50ZXJhY3Rpb25zIGFsbG93ZWQuICBCeVxuICAgKiBkZWZhdWx0IG9ubHkgMSBpbnRlcmFjdGlvbiBpcyBhbGxvd2VkIGF0IGEgdGltZSAoZm9yIGJhY2t3YXJkc1xuICAgKiBjb21wYXRpYmlsaXR5KS4gVG8gYWxsb3cgbXVsdGlwbGUgaW50ZXJhY3Rpb25zIG9uIHRoZSBzYW1lIEludGVyYWN0YWJsZXMgYW5kXG4gICAqIGVsZW1lbnRzLCB5b3UgbmVlZCB0byBlbmFibGUgaXQgaW4gdGhlIGRyYWdnYWJsZSwgcmVzaXphYmxlIGFuZCBnZXN0dXJhYmxlXG4gICAqIGAnbWF4J2AgYW5kIGAnbWF4UGVyRWxlbWVudCdgIG9wdGlvbnMuXG4gICAqXG4gICAqIEBhbGlhcyBtb2R1bGU6aW50ZXJhY3QubWF4SW50ZXJhY3Rpb25zXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbmV3VmFsdWVdIEFueSBudW1iZXIuIG5ld1ZhbHVlIDw9IDAgbWVhbnMgbm8gaW50ZXJhY3Rpb25zLlxuICAgKi9cbiAgaW50ZXJhY3QubWF4SW50ZXJhY3Rpb25zID0gKG5ld1ZhbHVlKSA9PiBtYXhJbnRlcmFjdGlvbnMobmV3VmFsdWUsIHNjb3BlKVxuXG4gIHNjb3BlLmF1dG9TdGFydCA9IHtcbiAgICAvLyBBbGxvdyB0aGlzIG1hbnkgaW50ZXJhY3Rpb25zIHRvIGhhcHBlbiBzaW11bHRhbmVvdXNseVxuICAgIG1heEludGVyYWN0aW9uczogSW5maW5pdHksXG4gICAgd2l0aGluSW50ZXJhY3Rpb25MaW1pdCxcbiAgICBjdXJzb3JFbGVtZW50OiBudWxsLFxuICAgIHNpZ25hbHM6IG5ldyB1dGlscy5TaWduYWxzKCksXG4gIH1cbn1cblxuLy8gQ2hlY2sgaWYgdGhlIGN1cnJlbnQgaW50ZXJhY3RhYmxlIHN1cHBvcnRzIHRoZSBhY3Rpb24uXG4vLyBJZiBzbywgcmV0dXJuIHRoZSB2YWxpZGF0ZWQgYWN0aW9uLiBPdGhlcndpc2UsIHJldHVybiBudWxsXG5mdW5jdGlvbiB2YWxpZGF0ZUFjdGlvbiAoYWN0aW9uLCBpbnRlcmFjdGFibGUsIGVsZW1lbnQsIGV2ZW50VGFyZ2V0LCBzY29wZSkge1xuICBpZiAoaW50ZXJhY3RhYmxlLnRlc3RJZ25vcmVBbGxvdyhpbnRlcmFjdGFibGUub3B0aW9uc1thY3Rpb24ubmFtZV0sIGVsZW1lbnQsIGV2ZW50VGFyZ2V0KSAmJlxuICAgICAgaW50ZXJhY3RhYmxlLm9wdGlvbnNbYWN0aW9uLm5hbWVdLmVuYWJsZWQgJiZcbiAgICAgIHdpdGhpbkludGVyYWN0aW9uTGltaXQoaW50ZXJhY3RhYmxlLCBlbGVtZW50LCBhY3Rpb24sIHNjb3BlKSkge1xuICAgIHJldHVybiBhY3Rpb25cbiAgfVxuXG4gIHJldHVybiBudWxsXG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTWF0Y2hlcyAoaW50ZXJhY3Rpb246IEludGVyYWN0LkludGVyYWN0aW9uLCBwb2ludGVyLCBldmVudCwgbWF0Y2hlczogSW50ZXJhY3QuSW50ZXJhY3RhYmxlW10sIG1hdGNoRWxlbWVudHM6IEVsZW1lbnRbXSwgZXZlbnRUYXJnZXQ6IEVsZW1lbnQsIHNjb3BlOiBJbnRlcmFjdC5TY29wZSkge1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gbWF0Y2hlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IG1hdGNoID0gbWF0Y2hlc1tpXVxuICAgIGNvbnN0IG1hdGNoRWxlbWVudCA9IG1hdGNoRWxlbWVudHNbaV1cbiAgICBjb25zdCBtYXRjaEFjdGlvbiA9IG1hdGNoLmdldEFjdGlvbihwb2ludGVyLCBldmVudCwgaW50ZXJhY3Rpb24sIG1hdGNoRWxlbWVudClcblxuICAgIGlmICghbWF0Y2hBY3Rpb24pIHsgY29udGludWUgfVxuXG4gICAgY29uc3QgYWN0aW9uID0gdmFsaWRhdGVBY3Rpb24oXG4gICAgICBtYXRjaEFjdGlvbixcbiAgICAgIG1hdGNoLFxuICAgICAgbWF0Y2hFbGVtZW50LFxuICAgICAgZXZlbnRUYXJnZXQsXG4gICAgICBzY29wZSlcblxuICAgIGlmIChhY3Rpb24pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjdGlvbixcbiAgICAgICAgaW50ZXJhY3RhYmxlOiBtYXRjaCxcbiAgICAgICAgZWxlbWVudDogbWF0Y2hFbGVtZW50LFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGFjdGlvbjogbnVsbCwgaW50ZXJhY3RhYmxlOiBudWxsLCBlbGVtZW50OiBudWxsIH1cbn1cblxuZnVuY3Rpb24gZ2V0QWN0aW9uSW5mbyAoaW50ZXJhY3Rpb246IEludGVyYWN0LkludGVyYWN0aW9uLCBwb2ludGVyOiBJbnRlcmFjdC5Qb2ludGVyVHlwZSwgZXZlbnQ6IEludGVyYWN0LlBvaW50ZXJFdmVudFR5cGUsIGV2ZW50VGFyZ2V0OiBFbGVtZW50LCBzY29wZTogSW50ZXJhY3QuU2NvcGUpIHtcbiAgbGV0IG1hdGNoZXMgPSBbXVxuICBsZXQgbWF0Y2hFbGVtZW50cyA9IFtdXG5cbiAgbGV0IGVsZW1lbnQgPSBldmVudFRhcmdldFxuXG4gIGZ1bmN0aW9uIHB1c2hNYXRjaGVzIChpbnRlcmFjdGFibGUpIHtcbiAgICBtYXRjaGVzLnB1c2goaW50ZXJhY3RhYmxlKVxuICAgIG1hdGNoRWxlbWVudHMucHVzaChlbGVtZW50KVxuICB9XG5cbiAgd2hpbGUgKHV0aWxzLmlzLmVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICBtYXRjaGVzID0gW11cbiAgICBtYXRjaEVsZW1lbnRzID0gW11cblxuICAgIHNjb3BlLmludGVyYWN0YWJsZXMuZm9yRWFjaE1hdGNoKGVsZW1lbnQsIHB1c2hNYXRjaGVzKVxuXG4gICAgY29uc3QgYWN0aW9uSW5mbyA9IHZhbGlkYXRlTWF0Y2hlcyhpbnRlcmFjdGlvbiwgcG9pbnRlciwgZXZlbnQsIG1hdGNoZXMsIG1hdGNoRWxlbWVudHMsIGV2ZW50VGFyZ2V0LCBzY29wZSlcblxuICAgIGlmIChhY3Rpb25JbmZvLmFjdGlvbiAmJlxuICAgICAgIWFjdGlvbkluZm8uaW50ZXJhY3RhYmxlLm9wdGlvbnNbYWN0aW9uSW5mby5hY3Rpb24ubmFtZV0ubWFudWFsU3RhcnQpIHtcbiAgICAgIHJldHVybiBhY3Rpb25JbmZvXG4gICAgfVxuXG4gICAgZWxlbWVudCA9IHV0aWxzLmRvbS5wYXJlbnROb2RlKGVsZW1lbnQpXG4gIH1cblxuICByZXR1cm4geyBhY3Rpb246IG51bGwsIGludGVyYWN0YWJsZTogbnVsbCwgZWxlbWVudDogbnVsbCB9XG59XG5cbmZ1bmN0aW9uIHByZXBhcmUgKGludGVyYWN0aW9uOiBJbnRlcmFjdC5JbnRlcmFjdGlvbiwgeyBhY3Rpb24sIGludGVyYWN0YWJsZSwgZWxlbWVudCB9LCBzY29wZTogSW50ZXJhY3QuU2NvcGUpIHtcbiAgYWN0aW9uID0gYWN0aW9uIHx8IHt9XG5cbiAgaWYgKGludGVyYWN0aW9uLmludGVyYWN0YWJsZSAmJiBpbnRlcmFjdGlvbi5pbnRlcmFjdGFibGUub3B0aW9ucy5zdHlsZUN1cnNvcikge1xuICAgIHNldEN1cnNvcihpbnRlcmFjdGlvbi5lbGVtZW50IGFzIEhUTUxFbGVtZW50LCAnJywgc2NvcGUpXG4gIH1cblxuICBpbnRlcmFjdGlvbi5pbnRlcmFjdGFibGUgPSBpbnRlcmFjdGFibGVcbiAgaW50ZXJhY3Rpb24uZWxlbWVudCA9IGVsZW1lbnRcbiAgdXRpbHMuY29weUFjdGlvbihpbnRlcmFjdGlvbi5wcmVwYXJlZCwgYWN0aW9uKVxuXG4gIGludGVyYWN0aW9uLnJlY3QgPSBpbnRlcmFjdGFibGUgJiYgYWN0aW9uLm5hbWVcbiAgICA/IGludGVyYWN0YWJsZS5nZXRSZWN0KGVsZW1lbnQpXG4gICAgOiBudWxsXG5cbiAgaWYgKGludGVyYWN0YWJsZSAmJiBpbnRlcmFjdGFibGUub3B0aW9ucy5zdHlsZUN1cnNvcikge1xuICAgIGNvbnN0IGN1cnNvciA9IGFjdGlvbiA/IHNjb3BlLmFjdGlvbnNbYWN0aW9uLm5hbWVdLmdldEN1cnNvcihhY3Rpb24pIDogJydcbiAgICBzZXRDdXJzb3IoaW50ZXJhY3Rpb24uZWxlbWVudCBhcyBIVE1MRWxlbWVudCwgY3Vyc29yLCBzY29wZSlcbiAgfVxuXG4gIHNjb3BlLmF1dG9TdGFydC5zaWduYWxzLmZpcmUoJ3ByZXBhcmVkJywgeyBpbnRlcmFjdGlvbiB9KVxufVxuXG5mdW5jdGlvbiB3aXRoaW5JbnRlcmFjdGlvbkxpbWl0IChpbnRlcmFjdGFibGU6IEludGVyYWN0LkludGVyYWN0YWJsZSwgZWxlbWVudDogRWxlbWVudCwgYWN0aW9uLCBzY29wZTogSW50ZXJhY3QuU2NvcGUpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IGludGVyYWN0YWJsZS5vcHRpb25zXG4gIGNvbnN0IG1heEFjdGlvbnMgPSBvcHRpb25zW2FjdGlvbi5uYW1lXS5tYXhcbiAgY29uc3QgbWF4UGVyRWxlbWVudCA9IG9wdGlvbnNbYWN0aW9uLm5hbWVdLm1heFBlckVsZW1lbnRcbiAgY29uc3QgYXV0b1N0YXJ0TWF4ID0gc2NvcGUuYXV0b1N0YXJ0Lm1heEludGVyYWN0aW9uc1xuICBsZXQgYWN0aXZlSW50ZXJhY3Rpb25zID0gMFxuICBsZXQgaW50ZXJhY3RhYmxlQ291bnQgPSAwXG4gIGxldCBlbGVtZW50Q291bnQgPSAwXG5cbiAgLy8gbm8gYWN0aW9ucyBpZiBhbnkgb2YgdGhlc2UgdmFsdWVzID09IDBcbiAgaWYgKCEobWF4QWN0aW9ucyAmJiBtYXhQZXJFbGVtZW50ICYmIGF1dG9TdGFydE1heCkpIHsgcmV0dXJuIGZhbHNlIH1cblxuICBmb3IgKGNvbnN0IGludGVyYWN0aW9uIG9mIHNjb3BlLmludGVyYWN0aW9ucy5saXN0KSB7XG4gICAgY29uc3Qgb3RoZXJBY3Rpb24gPSBpbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lXG5cbiAgICBpZiAoIWludGVyYWN0aW9uLmludGVyYWN0aW5nKCkpIHsgY29udGludWUgfVxuXG4gICAgYWN0aXZlSW50ZXJhY3Rpb25zKytcblxuICAgIGlmIChhY3RpdmVJbnRlcmFjdGlvbnMgPj0gYXV0b1N0YXJ0TWF4KSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoaW50ZXJhY3Rpb24uaW50ZXJhY3RhYmxlICE9PSBpbnRlcmFjdGFibGUpIHsgY29udGludWUgfVxuXG4gICAgaW50ZXJhY3RhYmxlQ291bnQgKz0gb3RoZXJBY3Rpb24gPT09IGFjdGlvbi5uYW1lID8gMSA6IDBcblxuICAgIGlmIChpbnRlcmFjdGFibGVDb3VudCA+PSBtYXhBY3Rpb25zKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoaW50ZXJhY3Rpb24uZWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgZWxlbWVudENvdW50KytcblxuICAgICAgaWYgKG90aGVyQWN0aW9uID09PSBhY3Rpb24ubmFtZSAmJiBlbGVtZW50Q291bnQgPj0gbWF4UGVyRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXV0b1N0YXJ0TWF4ID4gMFxufVxuXG5mdW5jdGlvbiBtYXhJbnRlcmFjdGlvbnMgKG5ld1ZhbHVlLCBzY29wZTogSW50ZXJhY3QuU2NvcGUpIHtcbiAgaWYgKHV0aWxzLmlzLm51bWJlcihuZXdWYWx1ZSkpIHtcbiAgICBzY29wZS5hdXRvU3RhcnQubWF4SW50ZXJhY3Rpb25zID0gbmV3VmFsdWVcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZXR1cm4gc2NvcGUuYXV0b1N0YXJ0Lm1heEludGVyYWN0aW9uc1xufVxuXG5mdW5jdGlvbiBzZXRDdXJzb3IgKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjdXJzb3IsIHNjb3BlOiBJbnRlcmFjdC5TY29wZSkge1xuICBpZiAoc2NvcGUuYXV0b1N0YXJ0LmN1cnNvckVsZW1lbnQpIHtcbiAgICBzY29wZS5hdXRvU3RhcnQuY3Vyc29yRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnJ1xuICB9XG5cbiAgZWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3IgPSBjdXJzb3JcbiAgZWxlbWVudC5zdHlsZS5jdXJzb3IgPSBjdXJzb3JcbiAgc2NvcGUuYXV0b1N0YXJ0LmN1cnNvckVsZW1lbnQgPSBjdXJzb3IgPyBlbGVtZW50IDogbnVsbFxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlkOiAnYXV0by1zdGFydC9iYXNlJyxcbiAgaW5zdGFsbCxcbiAgbWF4SW50ZXJhY3Rpb25zLFxuICB3aXRoaW5JbnRlcmFjdGlvbkxpbWl0LFxuICB2YWxpZGF0ZUFjdGlvbixcbn0gYXMgSW50ZXJhY3QuUGx1Z2luXG4iXX0=