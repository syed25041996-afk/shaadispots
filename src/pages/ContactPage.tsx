import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Send,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Venue Enquiry',
    message: '',
  });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Thank you for reaching out! A ShaadiSpots concierge will contact you within 2 hours.', 'success');
    setFormData({ name: '', email: '', phone: '', subject: 'Venue Enquiry', message: '' });
  };

  const faqs = [
    {
      q: 'How do you verify the ratings and reviews for each hall?',
      a: 'We directly integrate with the Google Places API to bring genuine ratings, total review counts, and authentic reviews from families and couples who hosted celebrations at each venue.',
    },
    {
      q: 'Do I need to pay ShaadiSpots any fee to book a banquet?',
      a: 'No! ShaadiSpots is 100% free for couples and families. All bookings and financial arrangements are made directly with the venue management at direct rates.',
    },
    {
      q: 'I am a marriage hall owner. How can I list my venue on ShaadiSpots?',
      a: 'Simply send us a message below selecting "List My Venue". Our onboarding team will verify your property and showcase your banquet to thousands of active couples.',
    },
    {
      q: 'Can I visit the venue in person before booking?',
      a: 'Yes! We encourage families to shortlist 2-3 venues on ShaadiSpots, inspect their photo galleries and reviews, then schedule in-person site visits and food tastings.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 text-brand-900 border border-brand-200/80 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          We're Here For Your Big Day
        </div>
        <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-stone-900 tracking-tight">
          Contact Our Concierge Desk
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
          Need help picking the right banquet for your guest count or want to list your wedding property? Reach out to us.
        </p>
      </div>

      {/* Grid: Contact Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left Column: Info Cards (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-brand-950 text-white rounded-3xl p-8 border border-gold-500/30 shadow-wedding-lg space-y-6">
            <h3 className="font-serif font-bold text-xl text-cream-100">
              Get In Touch
            </h3>
            <p className="text-stone-300 text-xs leading-relaxed">
              Our venue scouting consultants are available 7 days a week to assist with dates, rates, and site visits.
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-stone-200 pt-2">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold block text-white">Call Concierge</span>
                  <span>+91 98000 12345 / +91 98000 54321</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold block text-white">Email Us</span>
                  <span>concierge@shaadispots.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold block text-white">Headquarters</span>
                  <span>4th Floor, Prestige Tower, MG Road, Bengaluru, 560001</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold block text-white">Working Hours</span>
                  <span>Mon - Sun: 9:00 AM – 8:30 PM IST</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-8 border border-stone-200 shadow-wedding">
          <h3 className="font-serif font-bold text-xl text-stone-900 mb-2">
            Send A Message
          </h3>
          <p className="text-stone-500 text-xs mb-6">
            Fill out the details below and we’ll get back to you promptly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Kapoor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700/30"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700/30"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Topic / In Need Of
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700/30 text-stone-800"
                >
                  <option value="Venue Enquiry">Assistance Shortlisting Venues</option>
                  <option value="List My Venue">List My Banquet on ShaadiSpots (Venue Partner)</option>
                  <option value="Site Visit">Schedule a Venue Site Visit</option>
                  <option value="General Feedback">General Feedback & Support</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Message / Details *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Share your wedding dates, guest expectations, or venue details..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700/30"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-brand-900 hover:bg-brand-950 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-gold-300" />
              <span>Send Message to Concierge</span>
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-wedding space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-brand-900" />
          <h3 className="font-serif font-bold text-xl text-stone-900">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-stone-200/80 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-serif font-semibold text-sm sm:text-base text-stone-900 flex items-center justify-between gap-4 bg-stone-50/50 hover:bg-stone-50"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-2 text-xs sm:text-sm text-stone-600 leading-relaxed bg-white border-t border-stone-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
