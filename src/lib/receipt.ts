import { formatPrice, formatDate } from "./utils";

export function printAppointmentReceipt(appointment: any): void {
  if (typeof window === "undefined") return;

  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Receipt — SalonBook #${appointment._id}</title>
        <style>
          body { font-family: 'Georgia', serif; padding: 40px; color: #1F1D1D; line-height: 1.6; }
          .header { text-align: center; border-bottom: 2px solid #EFE8E3; padding-bottom: 20px; }
          .title { font-size: 24px; font-weight: bold; }
          .details { margin-top: 30px; }
          .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #DDD; }
          .total { font-size: 18px; font-weight: bold; margin-top: 20px; border-top: 2px solid #1F1D1D; padding-top: 10px; }
          .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #6E6966; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">SalonBook — Luxury & Wellness</div>
          <div>482 Madison Avenue, Suite 7A, Manhattan, NY</div>
          <div>Official Booking & Payment Receipt</div>
        </div>
        <div class="details">
          <div class="row"><span>Customer:</span><span>${appointment.customerName || appointment.customerEmail}</span></div>
          <div class="row"><span>Service:</span><span>${appointment.serviceId?.serviceName || "Salon Treatment"}</span></div>
          <div class="row"><span>Appointment Date:</span><span>${formatDate(appointment.appointmentDate)}</span></div>
          <div class="row"><span>Time Slot:</span><span>${appointment.timeSlot}</span></div>
          <div class="row"><span>Status:</span><span>${appointment.status.toUpperCase()}</span></div>
          <div class="row"><span>Payment Status:</span><span>${appointment.paymentStatus.toUpperCase()} (STRIPE VERIFIED)</span></div>
          <div class="row total"><span>Total Amount Paid:</span><span>${formatPrice(appointment.servicePrice)}</span></div>
        </div>
        <div class="footer">
          <p>Thank you for choosing SalonBook. We look forward to your visit.</p>
        </div>
        <script>window.onload = function() { window.print(); };</script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
