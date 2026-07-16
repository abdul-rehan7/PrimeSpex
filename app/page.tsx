import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { Work } from '@/components/sections/work';
import { Contact } from '@/components/sections/contact';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <Work />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
