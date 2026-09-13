import { leadership, eventManager } from '@/lib/content';
import LogisticsForm from './LogisticsForm';

export default function Logistics() {
  return (
    <section id="logistics" className="bg-foam py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">
          Plan Your Trip
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-sm border border-ink/10 p-6">
            <p className="text-xs uppercase tracking-wide text-coral">
              Event manager
            </p>
            <h3 className="mt-2 font-display text-xl text-ink">
              {eventManager.agency}
            </h3>
            <p className="mt-2 text-sm text-slate/70">{eventManager.address}</p>
            <a
              href={`mailto:${eventManager.email}`}
              className="mt-4 block text-sm text-reef hover:underline"
            >
              {eventManager.email}
            </a>
            <div className="mt-2 flex flex-col gap-1">
              {eventManager.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="text-sm text-reef hover:underline"
                >
                  {phone}
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate/50">
              For air ticketing, accommodation, and local sightseeing, contact
              the event manager directly.
            </p>
          </div>

          <div className="rounded-sm border border-ink/10 p-6">
            <p className="mb-4 text-xs uppercase tracking-wide text-coral">
              Send an inquiry
            </p>
            <LogisticsForm />
          </div>
        </div>

        <p className="mt-14 text-xs uppercase tracking-wide text-slate/60">
          Organizing committee
        </p>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {leadership.map((person) => (
            <div key={person.name} className="rounded-sm border border-ink/10 p-6">
              <h3 className="font-display text-lg text-ink">{person.name}</h3>
              {person.roles.map((role) => (
                <p key={role} className="text-sm text-slate/60">
                  {role}
                </p>
              ))}
              <div className="mt-3 flex flex-col gap-1">
                <a href={`mailto:${person.email}`} className="text-sm text-reef hover:underline">
                  {person.email}
                </a>
                <a
                  href={`tel:${person.phone}`}
                  className="text-sm text-reef hover:underline"
                >
                  {person.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
