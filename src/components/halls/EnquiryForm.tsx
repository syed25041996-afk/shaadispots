import React, { useState } from 'react';
import { Hall, EnquiryPayload } from '../../types/hall';
import { createEnquiry } from '../../services/hallService';
import { useToast } from '../../context/ToastContext';
import {
  Calendar,
  Users,
  Phone,
  Mail,
  User,
  MessageSquare,
  Sparkles,
  Loader2,
  CheckCircle2
} from 'lucide-react';

interface EnquiryFormProps {
  hall: Hall;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ hall }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<EnquiryPayload>({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    guestCount: hall.capacityMin || 300,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guestCount' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!formData.name || !formData.phone || !formData.email || !formData.eventDate) {
      showToast('Please fill in all required enquiry fields.', 'error');
      return;
    }

    try {
      setLoading(true);
      await createEnquiry(hall.id, formData);
      setSubmitted(true);
      showToast(
        `Enquiry sent for ${hall.name}! The venue manager will call you within 2 business hours.`,
        'success'
      );
      // Reset after a moment
      setFormData({
        name: '',
        phone: '',
        email: '',
        eventDate: '',
        guestCount: hall.capacityMin || 300,
        message: '',
      });
    } catch (err: any) {
      showToast(err?.message || 'Failed to submit enquiry. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-wedding-lg sticky top-24">
      {/* Header */}
      <div className="border-b border-stone-100 pb-4 mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-900 border border-brand-200/60 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          Direct Venue Enquiry
        </div>
        <h3 className="font-serif font-bold text-xl text-stone-900">
          Check Availability & Pricing
        </h3>
        <p className="text-xs text-stone-500 mt-1">
          Lock the best seasonal dates for {hall.name}
        </p>
      </div>

      {submitted ? (
        <div className="p-6 rounded-2xl bg-cream-50 border border-gold-300 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-serif font-bold text-base text-stone-900">
            Enquiry Received!
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Our wedding venue specialist and {hall.name} banqueting team will review your requested date and share a personalized quote shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-2 text-xs font-bold text-brand-800 hover:text-brand-950 underline"
          >
            Send another enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label htmlFor="enquiry-name" className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Your Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                id="enquiry-name"
                name="name"
                type="text"
                required
                placeholder="e.g. Pooja Sharma"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700/30 focus:border-brand-700 transition"
              />
            </div>
          </div>

          {/* Contact Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="enquiry-phone" className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 98..."
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700/30 focus:border-brand-700 transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="enquiry-email" className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  id="enquiry-email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700/30 focus:border-brand-700 transition"
                />
              </div>
            </div>
          </div>

          {/* Event Date & Guest Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="enquiry-date" className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Tentative Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  id="enquiry-date"
                  name="eventDate"
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700/30 focus:border-brand-700 transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="enquiry-guests" className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Guest Count
              </label>
              <div className="relative">
                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  id="enquiry-guests"
                  name="guestCount"
                  type="number"
                  min="50"
                  max="5000"
                  step="25"
                  value={formData.guestCount}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700/30 focus:border-brand-700 transition"
                />
              </div>
            </div>
          </div>

          {/* Message Notes */}
          <div className="space-y-1">
            <label htmlFor="enquiry-message" className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Special Requests (Optional)
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
              <textarea
                id="enquiry-message"
                name="message"
                rows={2}
                placeholder="E.g. Sangeet + Wedding combined, need Jain catering counters..."
                value={formData.message}
                onChange={handleChange}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700/30 focus:border-brand-700 transition"
              />
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-900 to-brand-800 hover:from-brand-950 hover:to-brand-900 text-white font-bold text-sm shadow-wedding hover:shadow-wedding-lg transition-all duration-300 flex items-center justify-center gap-2 border border-gold-500/30 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-gold-300" />
                <span>Submitting Enquiry...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-gold-300" />
                <span>Send Booking Enquiry</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-stone-600 leading-tight">
            100% Free Service • Direct Venue Pricing • No Hidden Booking Fees
          </p>
        </form>
      )}
    </div>
  );
};

