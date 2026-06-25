'use client'

import { useRef } from 'react'
import { motion } from 'motion/react'
import { TestimonialsColumn, type Review } from '@/components/ui/testimonials-columns'

const reviews: Review[] = [
  { name: 'Cecilia Wu',            date: '23 mars 2026',      text: "Je tiens à remercier chaleureusement l'agence Immotec, et en particulier Julien, pour son professionnalisme et son accompagnement exceptionnel. Dès le premier contact, Julien a fait preuve d'écoute, de disponibilité et d'une grande transparence. Il a su comprendre parfaitement mes besoins et m'a guidé à chaque étape avec des conseils clairs et pertinents. Grâce à son efficacité et à son sérieux, tout le processus s'est déroulé de manière fluide et rassurante. Je recommande vivement Immotec !" },
  { name: 'Iio A',                 date: '13 mars 2026',      text: "Un grand merci à l'agence IMMOTEC, et tout particulièrement à Clémence, pour avoir géré notre dossier de A à Z avec beaucoup de sérieux et de bienveillance. Toujours disponible, rapide et efficace — on s'est sentis vraiment bien accompagnés à chaque étape. Je recommande sans hésiter !" },
  { name: 'X S',                   date: '9 mars 2026',       text: "Un grand merci à M. BENSIMON pour son accompagnement dans ma recherche de logement. Très professionnel, toujours disponible et patient, il prend le temps de répondre à toutes les questions avec clarté. L'équipe de l'agence est efficace et très facile à contacter. Je recommande cette agence sans hésitation !" },
  { name: 'Quentin Lintzer',       date: '21 février 2026',   text: "Excellent niveau de professionnalisme, l'agence s'est occupée de la relocation de mon bien de bout en bout, merci beaucoup." },
  { name: 'Thomas Bonnier',        date: '8 février 2026',    text: "L'agence a été très professionnelle, transparente et réactive lors de ma recherche de bien à louer. Tout a été réglé en quelques jours, ce qui m'arrangeait car j'étais assez pressé. Je suis très satisfait de mon expérience avec l'agence et du résultat." },
  { name: 'Laurence Bailloux',     date: '30 janvier 2026',   text: "Très satisfaite de l'efficacité de l'agence pour la vente de 2 biens immobilier sur Paris 20ème. Bonne estimation, vente bien menée et bon suivi du dossier." },
  { name: 'Michele C',             date: '10 janvier 2026',   text: "J'ai vendu mon appartement avec l'aide de Mr Bensimon et de Clemence de l'agence Immotec javel qui forment une belle équipe de conseil et à l'écoute des désirs de leurs clients. Je conseille vivement." },
  { name: 'olivier leclerc',       date: '24 décembre 2025',  text: "Agence très professionnelle ; direction et employée au top. Je recommande cette agence immobilière sans réserve." },
  { name: 'Jihyun Jaclyn Shin',    date: '1 novembre 2025',   text: "J'ai visité plusieurs agences avant de louer mon appartement et j'ai eu le sentiment qu'une agence à taille humaine comme Immotec pourrait régler mon problème plus rapidement. Et j'avais raison ! Mme Clémence Garat est très professionnelle, accueillante et réactive dans ses communications. Grâce à elle, j'ai pu louer mon appartement très rapidement. Je pense continuer à faire appel à Immotec. Merci Clémence !" },
  { name: 'Alice Chemama',         date: '30 octobre 2025',   text: "J'ai fait l'acquisition de mon appartement via l'agence IMMOTEC, qui a suivi attentivement le dossier jusqu'à la signature. Un grand merci à Monsieur Bensimon pour son amabilité et son professionnalisme." },
  { name: 'Antoine Bertrand',      date: '8 octobre 2025',    text: "Mon appartement a été loué alors que je n'étais pas sur place et cela s'est très bien passé. Bonne communication et sérieux dans les démarches." },
  { name: 'Stéphanie Nehmé',       date: '25 septembre 2025', text: "C'est grâce à Monsieur Bensimon que nous avons découvert l'appartement que nous avons acheté dans le 16ème à Paris, et avec Madame Garat ils nous ont accompagnés avec beaucoup de disponibilité et de sérieux. Toujours à l'écoute, ils ont répondu à toutes nos questions. Un service remarquable du début à la fin, nous les recommandons vivement !" },
  { name: 'Mane de Chanterac',     date: '21 septembre 2025', text: "Agence Immotec Paris 15 : une équipe compétente, courtoise et disponible. Patience et négociation fine pour un résultat efficace dans une conjoncture difficile : un vrai savoir-faire. Un grand merci à vous." },
  { name: 'GREGORI Jérôme',        date: '5 septembre 2025',  text: "Super accueil de la part de Clémence, que ce soit au téléphone ou en visites. Cette jeune femme très compréhensive des besoins du client, toujours disponible, très réceptive et surtout, compétente ! Clémence de l'agence Immotec Paris 15. N'hésitez pas à la solliciter, vous ne serez pas déçu." },
  { name: 'Alexandre Haret',       date: '27 août 2025',      text: "L'agence IMMOTEC a vendu notre appartement. Nous avons été très bien accueillis par Clémence, qui nous a accompagnés dans notre projet du début à la fin. Elle a toujours été très réactive. Nous recommandons vivement l'agence IMMOTEC." },
  { name: 'Caroline benet',        date: '11 juillet 2025',   text: "Un grand merci à l'agence IMMOTEC pour leur efficacité et leur sérieux tout au long de la mise en location de mon bien. Monsieur BENSIMON a pris en main le dossier avec professionnalisme, puis a passé le relais à Clémence GARAT, qui a assuré avec rigueur l'installation du locataire. Une équipe impliquée et efficace que je recommande sans hésiter." },
  { name: 'Aurélie Duforets',      date: '10 juillet 2025',   text: "Nous avons été très bien accompagnés pour la recherche d'une location à Paris. Clémence a été très professionnelle et très disponible. Ce fut un réel plaisir de faire affaire avec elle. Elle nous a proposé un logement parfait, en réelle adéquation avec ce que nous recherchions. Je recommande IMMOTEC !" },
  { name: 'Laurent Mis',           date: '25 juin 2025',      text: "Nous sommes très satisfaits de l'excellent travail que l'agence Immotec et Julien ont accompli. Vivement recommandé ! Grâce à leur expertise et leur accompagnement de chaque instant, les démarches se font en toute sérénité." },
  { name: 'Françoise Saunière',    date: '25 juin 2025',      text: "Fiabilité, réactivité, efficacité et excellents conseils : ça a été un plaisir d'avoir affaire à Mr Bensimon tout au long du projet qui vient d'aboutir. En cas de besoin je m'adresserai très probablement à nouveau à votre agence." },
  { name: 'Eglantine Dupuy',       date: '27 mai 2025',       text: "Très satisfaite du service d'Immotec qui a trouvé un locataire pour mon appartement en temps record ! Je les recommande vivement !" },
  { name: 'HAIFA TRABELSI',        date: '24 mai 2025',       text: "Un service exceptionnel et hors norme. Je suis extrêmement reconnaissante à Mr Bensimon, qui a su gérer à temps notre demande. Très humain, à l'écoute et surtout professionnel. Avec lui, nous avons réussi à trouver le bien qui nous convenait en 3 jours seulement (visite+signature). Je suis impressionnée par son sens de l'écoute, sa disponibilité et sa gentillesse." },
  { name: 'Mike Sellam',           date: '13 mai 2025',       text: "Je viens de réaliser une transaction avec l'agence IMMOTEC et je suis pleinement satisfait de la façon dont ils ont géré la vente de mon bien. À conseiller vivement !" },
  { name: 'Jonathan Marshall',     date: '29 avril 2025',     text: "Monsieur Bensimon a mis mon appartement en vente en décembre 2024 et a reçu une offre en moins de trois semaines. Tout s'est déroulé sans problème jusqu'à la finalisation de la vente en avril. Je suis très satisfait de la façon dont tout a été géré." },
  { name: 'Bassem Kharrat',        date: '28 avril 2025',     text: "Agent très professionnel et expérimenté. Ils proposent un large choix d'appartements de qualité. Je recommande." },
  { name: 'Jean François Liaudois',date: '16 avril 2025',     text: "Agent ponctuel, accueillant. Respecte ses engagements. À recommander." },
  { name: 'Nathalie Bretelle',     date: '11 avril 2025',     text: "Nous sommes extrêmement satisfaits des services de cette agence immobilière. Ils ont vraiment pris le temps de comprendre nos critères et notre urgence. Grâce à leur écoute attentive, ils nous ont trouvé un bien idéalement situé en un temps record. Une agence très professionnelle que nous recommandons sans hésiter. Merci Clémence !" },
  { name: 'Christine Baure',       date: '5 avril 2025',      text: "Agence professionnelle, réactive et qui sait se rendre disponible pour satisfaire son client. Je recommande vivement." },
  { name: 'Benjamin D',            date: '27 mars 2025',      text: "Agence réactive et efficace, je recommande !" },
  { name: 'berthier berthier-Nguyen', date: '21 mars 2025',   text: "Cette agence se distingue par son accueil chaleureux et son professionnalisme. Je tiens à remercier M. Bensimon et Clémence pour leur patience exemplaire, leur écoute attentive et leurs précieux conseils. Leur travail de qualité, leur bienveillance et leur grande disponibilité méritent d'être soulignés." },
  { name: 'Alexia Picco',          date: '15 janvier 2025',   text: "Un merci à Clémence pour son accompagnement tout au long de la vente de mon appartement. Très réactive, toujours à l'écoute, et d'excellent conseil, ce qui a rendu cette expérience fluide et rassurante. La vente s'est déroulée rapidement et dans les meilleures conditions. Je recommande cette agence à tous." },
]

const col1 = reviews.slice(0, 10)
const col2 = reviews.slice(10, 20)
const col3 = reviews.slice(20, 30)

export default function AvisClients() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section id="avis" className="section" ref={sectionRef}>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="flex flex-col items-center text-center mb-12"
      >
        <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>
          <div className="sec-eye-line" />
          <span className="sec-eye-text">Témoignages</span>
          <div className="sec-eye-line" />
        </div>
        <h2 className="sec-title mt-4">Ce que disent nos <em>clients</em></h2>
        <p className="sec-sub">
          Avis Google vérifiés · Note moyenne{' '}
          <strong style={{ color: 'var(--navy)' }}>4,9 / 5</strong>
        </p>
      </motion.div>

      <div className="flex justify-center gap-3 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] max-h-[660px] overflow-hidden">
        <TestimonialsColumn reviews={col1} duration={45} />
        <TestimonialsColumn reviews={col2} duration={55} className="hidden md:block" />
        <TestimonialsColumn reviews={col3} duration={50} className="hidden lg:block" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="avis-footer justify-center mt-12"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <div className="g-score">4,9 / 5</div>
        <div className="g-meta">Basé sur <strong style={{ color: 'var(--navy)' }}>30+ avis</strong> Google vérifiés</div>
      </motion.div>
    </section>
  )
}
