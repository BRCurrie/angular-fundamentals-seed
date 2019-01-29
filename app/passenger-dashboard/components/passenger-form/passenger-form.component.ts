import { Component, Input, Output } from "@angular/core";
import { Passenger } from "../../models/passenger.interface";
import { Baggage } from "../../models/baggage.interface";
import { EventEmitter } from "@angular/forms/src/facade/async";


@Component({
    selector: 'passenger-form',
    styleUrls: ['passenger-form.component.scss'],
    template: `
   
    <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>
        <div>
            Passenger name:
            <input type="text"
                name="fullname"
                required
                #fullname="ngModel"
                [ngModel]="detail?.fullname">
                <div *ngIf="fullname.errors?.required" class="error">
                    Passenger name is required
                </div>
               
        </div>

        <div>
            Passenger ID:
                <input type="number"
                    name="id"
                    required
                    #id="ngModel"
                    [ngModel]="detail?.id">
                    {{ id.errors | json }}
        </div>

        <div>
            <label>
                <input
                    type="checkbox"
                    name="checkedIn"
                    [ngModel]="detail?.checkedIn"
                    (ngModelChange)="toggleCheckIn($event)">
            </label>
        </div>

        <div *ngIf="form.value.checkedIn">
            Check in date:
            <input 
            type="number" 
            name="checkedInDate" 
            [ngModel]="detail?.checkedInDate">
        </div>

        <div>
            Luggage:
            <select
                name="baggage"
                [ngModel]="detail?.baggage">
                <option
                    *ngFor="let item of baggage"
                    [ngValue]="item.key">
                    {{ item.value }}
                </option>
            </select>
        </div>

        <button 
        type="submit"
        [disabled]="form.invalid">
            Update passenger
        </button>

    </form>
    `
})

export class PassengerFormComponent {

    @Input()
    detail: Passenger;

    @Output()
    update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

    baggage: Baggage[] = [{
        key: 'none',
        value: 'No baggage'
    }, {
        key: 'hand-only',
        value: 'Hand Baggage'
    }, {
        key: 'hold-only',
        value: 'Hold Baggage'
    }, {
        key: 'hand-hold',
        value: 'Hand and old baggage'
    }];

    toggleCheckIn(checkedIn: boolean) {
        if (checkedIn) {
            this.detail.checkedInDate = Date.now();
        }
    }

    handleSubmit(passenger: Passenger, isValid: boolean) {
        if (isValid) {
            this.update.emit(passenger);
        }
    }

}