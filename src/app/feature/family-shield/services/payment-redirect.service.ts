import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentRedirectService {
  submit(paymentUrl: string, data: Record<string, string>) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = paymentUrl;
    form.style.display = 'none';

    Object.entries(data).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }
}
