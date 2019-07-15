class Signals {
    constructor() {
        this.listeners = {};
    }
    on(name, listener) {
        if (!this.listeners[name]) {
            this.listeners[name] = [listener];
            return;
        }
        this.listeners[name].push(listener);
    }
    off(name, listener) {
        if (!this.listeners[name]) {
            return;
        }
        const index = this.listeners[name].indexOf(listener);
        if (index !== -1) {
            this.listeners[name].splice(index, 1);
        }
    }
    fire(name, arg) {
        const targetListeners = this.listeners[name];
        if (!targetListeners) {
            return;
        }
        for (const listener of targetListeners) {
            if (listener(arg, name) === false) {
                return false;
            }
        }
    }
}
export default Signals;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2lnbmFscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNpZ25hbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZUEsTUFBTSxPQUFPO0lBQWI7UUFDRSxjQUFTLEdBRUwsRUFBRSxDQUFBO0lBZ0NSLENBQUM7SUE5QkMsRUFBRSxDQUFFLElBQVksRUFBRSxRQUF3QjtRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDakMsT0FBTTtTQUNQO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDckMsQ0FBQztJQUVELEdBQUcsQ0FBRSxJQUFZLEVBQUUsUUFBd0I7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFBRSxPQUFNO1NBQUU7UUFFckMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7UUFFcEQsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO1NBQ3RDO0lBQ0gsQ0FBQztJQUVELElBQUksQ0FBRSxJQUFZLEVBQUUsR0FBdUI7UUFDekMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUU1QyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQUUsT0FBTTtTQUFFO1FBRWhDLEtBQUssTUFBTSxRQUFRLElBQUksZUFBZSxFQUFFO1lBQ3RDLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQ2pDLE9BQU8sS0FBSyxDQUFBO2FBQ2I7U0FDRjtJQUNILENBQUM7Q0FDRjtBQUVELGVBQWUsT0FBTyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHR5cGUgU2lnbmFsTGlzdGVuZXIgPSAoc2lnbmFsQXJnOiBQYXJ0aWFsU2lnbmFsQXJnLCBzaW5hbE5hbWU/OiBzdHJpbmcpID0+ICh2b2lkIHwgYm9vbGVhbilcblxuZXhwb3J0IGludGVyZmFjZSBTaWduYWxBcmc8VCBleHRlbmRzIEludGVyYWN0LkFjdGlvbk5hbWUgPSBhbnk+IHtcbiAgaW50ZXJhY3Rpb246IEludGVyYWN0LkludGVyYWN0aW9uPFQ+XG4gIEludGVyYWN0YWJsZTogSW50ZXJhY3QuSW50ZXJhY3RhYmxlXG4gIGlFdmVudDogSW50ZXJhY3QuSW50ZXJhY3RFdmVudDxUPlxuICBlbGVtZW50OiBJbnRlcmFjdC5FdmVudFRhcmdldFxuICBjb29yZHM6IEludGVyYWN0LlBvaW50XG4gIGV2ZW50OiBJbnRlcmFjdC5Qb2ludGVyRXZlbnRUeXBlXG4gIHBoYXNlOiBJbnRlcmFjdC5FdmVudFBoYXNlXG4gIFtpbmRleDogc3RyaW5nXTogYW55XG59XG5cbmV4cG9ydCB0eXBlIFBhcnRpYWxTaWduYWxBcmcgPSBQYXJ0aWFsPFNpZ25hbEFyZz5cblxuY2xhc3MgU2lnbmFscyB7XG4gIGxpc3RlbmVyczoge1xuICAgIFtzaWduYWxOYW1lOiBzdHJpbmddOiBTaWduYWxMaXN0ZW5lcltdLFxuICB9ID0ge31cblxuICBvbiAobmFtZTogc3RyaW5nLCBsaXN0ZW5lcjogU2lnbmFsTGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzW25hbWVdKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyc1tuYW1lXSA9IFtsaXN0ZW5lcl1cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMubGlzdGVuZXJzW25hbWVdLnB1c2gobGlzdGVuZXIpXG4gIH1cblxuICBvZmYgKG5hbWU6IHN0cmluZywgbGlzdGVuZXI6IFNpZ25hbExpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLmxpc3RlbmVyc1tuYW1lXSkgeyByZXR1cm4gfVxuXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmxpc3RlbmVyc1tuYW1lXS5pbmRleE9mKGxpc3RlbmVyKVxuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5saXN0ZW5lcnNbbmFtZV0uc3BsaWNlKGluZGV4LCAxKVxuICAgIH1cbiAgfVxuXG4gIGZpcmUgKG5hbWU6IHN0cmluZywgYXJnOiBQYXJ0aWFsPFNpZ25hbEFyZz4pOiB2b2lkIHwgZmFsc2Uge1xuICAgIGNvbnN0IHRhcmdldExpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW25hbWVdXG5cbiAgICBpZiAoIXRhcmdldExpc3RlbmVycykgeyByZXR1cm4gfVxuXG4gICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiB0YXJnZXRMaXN0ZW5lcnMpIHtcbiAgICAgIGlmIChsaXN0ZW5lcihhcmcsIG5hbWUpID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2lnbmFsc1xuIl19