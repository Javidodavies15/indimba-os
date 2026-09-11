import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MapPin, User } from 'lucide-react';
import { communityProjectsStore } from '@indimba/mock-data';

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = communityProjectsStore.get(params.slug, 'slug');
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default function CommunityProjectPage({ params }: { params: { slug: string } }) {
  const project = communityProjectsStore.get(params.slug, 'slug');
  if (!project) notFound();

  return (
    <div>
      <div className="relative h-56 md:h-72">
        <Image src={project.coverUrl} alt={project.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/40 to-transparent" />
      </div>
      <div className="max-w-3xl mx-auto px-4 lg:px-6 -mt-12 relative">
        <span className="inline-block text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 mb-3">
          {project.status}
        </span>
        <h1 className="font-display text-3xl md:text-4xl tracking-wide text-white mb-4">{project.title}</h1>
        <div className="flex flex-wrap gap-5 text-sm text-surface-300 mb-6">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" /> {project.organizer}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> {project.location}
          </span>
        </div>
        <p className="text-surface-300 text-base leading-relaxed">{project.description}</p>
      </div>
    </div>
  );
}
