import { Component, computed, DestroyRef, inject, input, OnInit, output, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import type { AppointmentResponse } from '../../models/appointment.model';
import type { BusinessCardModel } from '../../models/business.model';
import { getApiErrorMessage } from '../../utils/api-error';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  styleUrl: './appointment-form.css',
  templateUrl: './appointment-form.html',
})
export class AppointmentForm implements OnInit {
  readonly business = input.required<BusinessCardModel>();
  readonly close = output<void>();

  private readonly appointmentService = inject(AppointmentService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly serviceId = signal('');
  protected readonly date = signal('');
  protected readonly time = signal('');
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly appointment = signal<AppointmentResponse | null>(null);
  protected readonly minDate = this.getLocalDate();
  protected readonly canBook = computed(
    () => this.serviceId().length > 0 && this.date().length > 0 && this.time().length > 0,
  );

  ngOnInit(): void {
    this.serviceId.set(String(this.business().services[0]?.idServicio ?? ''));
  }

  protected submitBooking(): void {
    if (!this.canBook() || this.loading()) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    this.appointmentService
      .createAppointment({
        fecha: this.date(),
        horaInicio: this.time(),
        servicioId: Number(this.serviceId()),
        idComercio: this.business().id,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (appointment) => {
          this.appointment.set(appointment);
          this.loading.set(false);
        },
        error: (error: unknown) => {
          this.errorMessage.set(getApiErrorMessage(error, 'No se pudo crear el turno.'));
          this.loading.set(false);
        },
      });
  }

  private getLocalDate(): string {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60_000);

    return localDate.toISOString().slice(0, 10);
  }
}
