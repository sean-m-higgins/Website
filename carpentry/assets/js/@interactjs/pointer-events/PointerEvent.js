import BaseEvent from '@interactjs/core/BaseEvent';
import pointerUtils from '@interactjs/utils/pointerUtils';
/** */
export default class PointerEvent extends BaseEvent {
    /** */
    constructor(type, pointer, event, eventTarget, interaction, timeStamp) {
        super(interaction);
        pointerUtils.pointerExtend(this, event);
        if (event !== pointer) {
            pointerUtils.pointerExtend(this, pointer);
        }
        this.timeStamp = timeStamp;
        this.originalEvent = event;
        this.type = type;
        this.pointerId = pointerUtils.getPointerId(pointer);
        this.pointerType = pointerUtils.getPointerType(pointer);
        this.target = eventTarget;
        this.currentTarget = null;
        if (type === 'tap') {
            const pointerIndex = interaction.getPointerIndex(pointer);
            this.dt = this.timeStamp - interaction.pointers[pointerIndex].downTime;
            const interval = this.timeStamp - interaction.tapTime;
            this.double = !!(interaction.prevTap &&
                interaction.prevTap.type !== 'doubletap' &&
                interaction.prevTap.target === this.target &&
                interval < 500);
        }
        else if (type === 'doubletap') {
            this.dt = pointer.timeStamp - interaction.tapTime;
        }
    }
    _subtractOrigin({ x: originX, y: originY }) {
        this.pageX -= originX;
        this.pageY -= originY;
        this.clientX -= originX;
        this.clientY -= originY;
        return this;
    }
    _addOrigin({ x: originX, y: originY }) {
        this.pageX += originX;
        this.pageY += originY;
        this.clientX += originX;
        this.clientY += originY;
        return this;
    }
    /**
     * Prevent the default behaviour of the original Event
     */
    preventDefault() {
        this.originalEvent.preventDefault();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9pbnRlckV2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUG9pbnRlckV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLDRCQUE0QixDQUFBO0FBQ2xELE9BQU8sWUFBWSxNQUFNLGdDQUFnQyxDQUFBO0FBRXpELE1BQU07QUFDTixNQUFNLENBQUMsT0FBTyxPQUFPLFlBQStCLFNBQVEsU0FBUztJQWFuRSxNQUFNO0lBQ04sWUFDRSxJQUFPLEVBQ1AsT0FBaUQsRUFDakQsS0FBZ0MsRUFDaEMsV0FBaUMsRUFDakMsV0FBaUMsRUFDakMsU0FBaUI7UUFFakIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ2xCLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBRXZDLElBQUksS0FBSyxLQUFLLE9BQU8sRUFBRTtZQUNyQixZQUFZLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtTQUMxQztRQUVELElBQUksQ0FBQyxTQUFTLEdBQU8sU0FBUyxDQUFBO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFBO1FBQzFCLElBQUksQ0FBQyxJQUFJLEdBQVksSUFBSSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQU8sWUFBWSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUN2RCxJQUFJLENBQUMsV0FBVyxHQUFLLFlBQVksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDekQsSUFBSSxDQUFDLE1BQU0sR0FBVSxXQUFXLENBQUE7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUE7UUFFekIsSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO1lBQ2xCLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDekQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFBO1lBRXRFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQTtZQUVyRCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPO2dCQUNsQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxXQUFXO2dCQUN4QyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTTtnQkFDMUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFBO1NBQ2xCO2FBQ0ksSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQzdCLElBQUksQ0FBQyxFQUFFLEdBQUksT0FBK0IsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQTtTQUMzRTtJQUNILENBQUM7SUFFRCxlQUFlLENBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUU7UUFDekMsSUFBSSxDQUFDLEtBQUssSUFBTSxPQUFPLENBQUE7UUFDdkIsSUFBSSxDQUFDLEtBQUssSUFBTSxPQUFPLENBQUE7UUFDdkIsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUE7UUFDdkIsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUE7UUFFdkIsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBRUQsVUFBVSxDQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFO1FBQ3BDLElBQUksQ0FBQyxLQUFLLElBQU0sT0FBTyxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLElBQU0sT0FBTyxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFBO1FBRXZCLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsY0FBYztRQUNaLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUE7SUFDckMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VFdmVudCBmcm9tICdAaW50ZXJhY3Rqcy9jb3JlL0Jhc2VFdmVudCdcbmltcG9ydCBwb2ludGVyVXRpbHMgZnJvbSAnQGludGVyYWN0anMvdXRpbHMvcG9pbnRlclV0aWxzJ1xuXG4vKiogKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50ZXJFdmVudDxUIGV4dGVuZHMgc3RyaW5nPiBleHRlbmRzIEJhc2VFdmVudCB7XG4gIHR5cGU6IFRcbiAgb3JpZ2luYWxFdmVudDogSW50ZXJhY3QuUG9pbnRlckV2ZW50VHlwZVxuICBwb2ludGVySWQ6IG51bWJlclxuICBwb2ludGVyVHlwZTogc3RyaW5nXG4gIGRvdWJsZTogYm9vbGVhblxuICBwYWdlWDogbnVtYmVyXG4gIHBhZ2VZOiBudW1iZXJcbiAgY2xpZW50WDogbnVtYmVyXG4gIGNsaWVudFk6IG51bWJlclxuICBkdDogbnVtYmVyXG4gIGV2ZW50YWJsZTogYW55XG5cbiAgLyoqICovXG4gIGNvbnN0cnVjdG9yIChcbiAgICB0eXBlOiBULFxuICAgIHBvaW50ZXI6IEludGVyYWN0LlBvaW50ZXJUeXBlIHwgUG9pbnRlckV2ZW50PGFueT4sXG4gICAgZXZlbnQ6IEludGVyYWN0LlBvaW50ZXJFdmVudFR5cGUsXG4gICAgZXZlbnRUYXJnZXQ6IEludGVyYWN0LkV2ZW50VGFyZ2V0LFxuICAgIGludGVyYWN0aW9uOiBJbnRlcmFjdC5JbnRlcmFjdGlvbixcbiAgICB0aW1lU3RhbXA6IG51bWJlcixcbiAgKSB7XG4gICAgc3VwZXIoaW50ZXJhY3Rpb24pXG4gICAgcG9pbnRlclV0aWxzLnBvaW50ZXJFeHRlbmQodGhpcywgZXZlbnQpXG5cbiAgICBpZiAoZXZlbnQgIT09IHBvaW50ZXIpIHtcbiAgICAgIHBvaW50ZXJVdGlscy5wb2ludGVyRXh0ZW5kKHRoaXMsIHBvaW50ZXIpXG4gICAgfVxuXG4gICAgdGhpcy50aW1lU3RhbXAgICAgID0gdGltZVN0YW1wXG4gICAgdGhpcy5vcmlnaW5hbEV2ZW50ID0gZXZlbnRcbiAgICB0aGlzLnR5cGUgICAgICAgICAgPSB0eXBlXG4gICAgdGhpcy5wb2ludGVySWQgICAgID0gcG9pbnRlclV0aWxzLmdldFBvaW50ZXJJZChwb2ludGVyKVxuICAgIHRoaXMucG9pbnRlclR5cGUgICA9IHBvaW50ZXJVdGlscy5nZXRQb2ludGVyVHlwZShwb2ludGVyKVxuICAgIHRoaXMudGFyZ2V0ICAgICAgICA9IGV2ZW50VGFyZ2V0XG4gICAgdGhpcy5jdXJyZW50VGFyZ2V0ID0gbnVsbFxuXG4gICAgaWYgKHR5cGUgPT09ICd0YXAnKSB7XG4gICAgICBjb25zdCBwb2ludGVySW5kZXggPSBpbnRlcmFjdGlvbi5nZXRQb2ludGVySW5kZXgocG9pbnRlcilcbiAgICAgIHRoaXMuZHQgPSB0aGlzLnRpbWVTdGFtcCAtIGludGVyYWN0aW9uLnBvaW50ZXJzW3BvaW50ZXJJbmRleF0uZG93blRpbWVcblxuICAgICAgY29uc3QgaW50ZXJ2YWwgPSB0aGlzLnRpbWVTdGFtcCAtIGludGVyYWN0aW9uLnRhcFRpbWVcblxuICAgICAgdGhpcy5kb3VibGUgPSAhIShpbnRlcmFjdGlvbi5wcmV2VGFwICYmXG4gICAgICAgIGludGVyYWN0aW9uLnByZXZUYXAudHlwZSAhPT0gJ2RvdWJsZXRhcCcgJiZcbiAgICAgICAgaW50ZXJhY3Rpb24ucHJldlRhcC50YXJnZXQgPT09IHRoaXMudGFyZ2V0ICYmXG4gICAgICAgIGludGVydmFsIDwgNTAwKVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAnZG91YmxldGFwJykge1xuICAgICAgdGhpcy5kdCA9IChwb2ludGVyIGFzIFBvaW50ZXJFdmVudDwndGFwJz4pLnRpbWVTdGFtcCAtIGludGVyYWN0aW9uLnRhcFRpbWVcbiAgICB9XG4gIH1cblxuICBfc3VidHJhY3RPcmlnaW4gKHsgeDogb3JpZ2luWCwgeTogb3JpZ2luWSB9KSB7XG4gICAgdGhpcy5wYWdlWCAgIC09IG9yaWdpblhcbiAgICB0aGlzLnBhZ2VZICAgLT0gb3JpZ2luWVxuICAgIHRoaXMuY2xpZW50WCAtPSBvcmlnaW5YXG4gICAgdGhpcy5jbGllbnRZIC09IG9yaWdpbllcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBfYWRkT3JpZ2luICh7IHg6IG9yaWdpblgsIHk6IG9yaWdpblkgfSkge1xuICAgIHRoaXMucGFnZVggICArPSBvcmlnaW5YXG4gICAgdGhpcy5wYWdlWSAgICs9IG9yaWdpbllcbiAgICB0aGlzLmNsaWVudFggKz0gb3JpZ2luWFxuICAgIHRoaXMuY2xpZW50WSArPSBvcmlnaW5ZXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXZlbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3VyIG9mIHRoZSBvcmlnaW5hbCBFdmVudFxuICAgKi9cbiAgcHJldmVudERlZmF1bHQgKCkge1xuICAgIHRoaXMub3JpZ2luYWxFdmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cbn1cbiJdfQ==