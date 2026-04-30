import { MOCK_LEADERSHIP } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Briefcase, GraduationCap, Award } from 'lucide-react';

export default async function LeadershipProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = MOCK_LEADERSHIP.find(m => m.slug === slug);

  if (!member) {
    notFound();
  }

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
            <ArrowLeft className="h-4 w-4" /> Back to Executive Branch
          </Link>
          
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-end">
            <div className="h-64 w-64 rounded-3xl overflow-hidden border-8 border-white/20 shadow-2xl bg-white shrink-0">
              <img src={member.photo_path} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left text-white pb-4">
              <h1 className="text-4xl md:text-6xl font-black mb-4">{member.name}</h1>
              <p className="text-xl md:text-2xl text-accent font-bold">{member.title}</p>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-8">
                <button className="flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-black hover:bg-accent hover:text-white transition-all shadow-xl">
                  <Mail className="h-5 w-5" /> Contact
                </button>
                <div className="flex gap-2">
                  <button className="h-12 w-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all">
                    <Briefcase className="h-5 w-5" />
                  </button>
                </div>
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
                  "{member.bio}"
                </p>
                <p>{member.longBio}</p>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-gray-100">
              <h2 className="text-3xl font-black text-dark mb-8 flex items-center gap-4">
                <div className="h-8 w-2 bg-accent rounded-full"></div>
                Key Achievements
              </h2>
              <div className="grid md:grid-cols-1 gap-6">
                {member.achievements?.map((item, index) => (
                  <div key={index} className="flex items-start gap-6 p-6 rounded-2xl bg-gray-50 hover:bg-accent/5 transition-colors group">
                    <div className="h-12 w-12 rounded-xl bg-white shadow-md flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-all">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-dark">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 sticky top-32">
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

              <div className="mt-12 pt-12 border-t border-gray-200">
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
