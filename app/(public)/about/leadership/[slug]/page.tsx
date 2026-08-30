import { MOCK_LEADERSHIP } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, GraduationCap, Award, MapPin, Users, Star } from 'lucide-react';

export default async function LeadershipProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = MOCK_LEADERSHIP.find(m => m.slug === slug);

  if (!member) {
    notFound();
  }

  const memberAny = member as any;

  return (
    <div className="min-h-screen bg-white">
      {/* Header / Banner */}
      <div className="bg-primary pt-32 pb-48 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -ml-48 -mb-48"></div>
        </div>
        
        <div className="container-wide relative z-10">
          <Link 
            href="/about" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-12 transition-colors font-bold uppercase tracking-widest text-xs"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Executive Bench
          </Link>
          
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-end">
            <div className="h-64 w-64 rounded-3xl overflow-hidden border-8 border-white/20 shadow-2xl bg-white shrink-0 relative">
              <Image src={member.photo_path} alt={member.name} fill sizes="64px" className="object-cover object-top" />
            </div>
            <div className="text-center md:text-left text-white pb-4">
              <h1 className="text-4xl md:text-6xl font-black mb-4">{member.name}</h1>
              <p className="text-xl md:text-2xl text-accent font-bold">{member.title}</p>
              {/* Quick meta badges */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                {member.batch && (
                  <span className="flex items-center gap-1.5 bg-white/10 text-white/90 text-xs font-bold px-3 py-1.5 rounded-full">
                    <Users className="h-3 w-3" /> Batch {member.batch}
                  </span>
                )}
                {memberAny.location && (
                  <span className="flex items-center gap-1.5 bg-white/10 text-white/90 text-xs font-bold px-3 py-1.5 rounded-full">
                    <MapPin className="h-3 w-3" /> {memberAny.location}
                  </span>
                )}
                {memberAny.expertise && (
                  <span className="flex items-center gap-1.5 bg-white/10 text-white/90 text-xs font-bold px-3 py-1.5 rounded-full">
                    <Star className="h-3 w-3" /> {memberAny.expertise}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-wide -mt-24 pb-24 relative z-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Bio */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-gray-100">
              <h2 className="text-3xl font-black text-dark mb-8 flex items-center gap-4">
                <div className="h-8 w-2 bg-primary rounded-full"></div>
                Biography
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
                <p className="text-xl font-medium text-primary/80 italic mb-8 border-l-4 border-accent pl-6">
                  &quot;{member.bio}&quot;
                </p>
                {member.longBio.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Achievements */}
            {member.achievements && member.achievements.length > 0 && (
              <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-gray-100">
                <h2 className="text-3xl font-black text-dark mb-8 flex items-center gap-4">
                  <div className="h-8 w-2 bg-accent rounded-full"></div>
                  Key Achievements
                </h2>
                <ul className="space-y-4">
                  {member.achievements.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <Award className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                      <span className="text-gray-600 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 sticky top-32">
              {/* Education */}
              <h3 className="text-xl font-black text-dark mb-8 flex items-center gap-3">
                <GraduationCap className="h-6 w-6 text-primary" />
                Education
              </h3>
              <ul className="space-y-6">
                {member.education?.map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0"></div>
                    <span className="text-gray-600 font-medium leading-tight">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Location */}
              {memberAny.location && (
                <div className="mt-10 pt-10 border-t border-gray-200">
                  <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Location
                  </h3>
                  <p className="font-bold text-dark">{memberAny.location}</p>
                </div>
              )}

              {/* Area of Expertise */}
              {memberAny.expertise && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Star className="h-4 w-4" /> Area of Expertise
                  </h3>
                  <p className="font-bold text-dark">{memberAny.expertise}</p>
                </div>
              )}

              {/* Chapter */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Chapter Affiliation</h3>
                <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                  <div className="h-3 w-3 rounded-full bg-accent animate-pulse"></div>
                  <span className="font-bold text-dark">{member.chapter} Chapter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
