import HeroSection from '@/components/sections/HeroSection';
import TextBlockSection from '@/components/sections/TextBlockSection';
import ImageTextSection from '@/components/sections/ImageTextSection';
import CardGridSection from '@/components/sections/CardGridSection';
import TeamGridSection from '@/components/sections/TeamGridSection';

export const metadata = {
  title: 'About Us',
  description: 'Learn about the history, mission, and leadership of BUPEXSA USA.',
};

export default function AboutPage() {
  return (
    <>
      <HeroSection
        variant="centered-white"
        heading="Our Story, Our Mission"
        subheading="BUPEXSA USA is more than an organization; it's a legacy of friendship and commitment that spans decades and continents."
        badge="About BUPEXSA USA"
      />





      <section className="section-padding bg-white overflow-hidden" id="our-story">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] bg-primary/10 text-primary mb-6">
                History
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-dark mb-6">OUR STORY</h2>
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-8 italic">From a shared table to Footprint: The Birth of BUPEXSA USA</h3>
              <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-500 space-y-8 leading-relaxed">
              <p>
                The idea of Buea Presbyterian Ex-Student Association (BUPEXSA) United States (USA) began around July 2011. As a few BUPEXSANS discovered themselves in the (District of Columbia, Maryland and Virginia) DMV. At the time, communication amongst us in the United States was not as easy as it is today. Finding one another was often tedious, and there was no central platform that connected us. However, as we gradually became aware of the growing presence of BUPEXSA alumni, particularly in the DMV area, the vision of bringing everyone together began to form.
              </p>
              
              <p>
                The conversations intensified when a couple of us linked during the Cameroon convention soccer game finals in Laurel Maryland. We took some pictures together and spent time catching up on old school memories and reconnecting after a long while. After the finals, we reunited at Ndasi Sylvia&apos;s house in Hyattsville, where she warmly hosted us with food and drinks. Present during the gathering were: Wananbowa Simon Ayompe, Adua Tebo Jonas, Ndasi Sylvia herself, Lum Ndeng Anne Marie, Ndah Germaine, and Njogoh Anim. Later, that night I took the group to a soya spot in Lanham (Princess) where the conversations about reconnecting and strengthening our bond intensified even more. With everyone engaged and enthusiastic, Anne Marie took the initiative to create a group chat which was newly introduced by WhatsApp, adding those who were present and encouraging us to inform and add other schoolmates about the existence of a Bupexsa group.
              </p>

              <p>
                We began intentionally searching for BUPEXSA alumni phone numbers, connecting with people, and adding them into what became one of the first BUPEXSA USA WhatsApp group. If memory serves me right, Anne-Marie played a major role in spearheading this effort, helping to gather contacts and keep the communication alive for a long while. After many months of conversations, individual meetups, and growing excitement, we finally decided it was time to have an official BUPEXSA gathering. I had the privilege of hosting the very first BUPEXSA USA meeting in my little apartment in Laurel, Maryland on a Saturday evening in December of 2011. The turnout exceeded expectations as you can see from past pictures.
              </p>

              <p>
                We had alumni represented from almost all batches, and beyond the meeting itself, there was laughter, reconnection, storytelling, and a genuine sense that something meaningful had just begun. It was the first time many of us experienced BUPEXSA fellowship again on the American soil, and it felt special. Following that successful first meeting, the group remained active. We continued holding meetings in the homes of different members, strengthening friendships and discussing ways to build the association further. Not long after, we organized a larger event in a hall around Lanham a memorable gathering that marked another major milestone in our growth. If I recall correctly, Ms. Nelly (who is a former Mathematics teacher of PCSS Buea Town) was invited to the occasion. 
              </p>

              <p>
                From that point onward, BUPEXSA USA was no longer just an idea. It had become a living community spearheaded by our first ever president Mr Osong Ama Baron. Though there were seasons when activities slowed down, the foundation that was laid during those early years never disappeared. The relationships remained, the group endured, and today it is heartwarming to see us still here, reconnecting and continuing what began with a simple desire to find one another and stay united.
              </p>

              <p className="font-bold text-dark">
                Indeed, what started as scattered conversations among a handful of PCSS graduates residing in the DMV over a decade ago, has grown into a lasting family and for that, we can all be proud.
              </p>

              <div className="pt-10 border-t border-gray-100 mt-12">
                <p className="text-dark font-black text-xl mb-1">Long Live BUPEXSA USA,</p>
                <p className="text-dark font-black text-xl mb-6">Long Live PCSS BUEA Town.</p>
                
                <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-primary">
                  <p className="text-dark font-bold">Narrator and Author:</p>
                  <p className="text-primary font-black text-lg">Wanambowa Simon Ayompe</p>
                  <p className="text-gray-400 text-sm italic">PCSS Alumnus</p>
                </div>
              </div>
            </div>

            {/* Bottom Image */}
            <div className="mt-20 relative">
              <div className="absolute -inset-4 border-2 border-primary/20 rounded-[3rem] translate-x-4 translate-y-4 pointer-events-none"></div>
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border-8 border-white">
                <img 
                  src="/images/about/first-meeting.png" 
                  alt="The First BUPEXSA USA Gathering" 
                  className="w-full h-auto"
                />
              </div>
              <p className="text-center mt-6 text-gray-400 text-sm font-medium italic">
                Past pictures from one of the earliest gatherings that laid the foundation for BUPEXSA USA.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TeamGridSection variant="four-col" heading="EXECUTIVE BENCH BUPEXSA USA" />
    </>
  );
}
