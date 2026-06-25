'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field'
import { ArrowRight } from 'lucide-react'

const schema = z.object({
  prenom:  z.string().min(1, 'Prénom requis'),
  nom:     z.string().min(1, 'Nom requis'),
  email:   z.string().email('Email invalide'),
  tel:     z.string().optional(),
  projet:  z.string().min(1, 'Sélectionnez un projet'),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const projets = [
  'Vendre mon bien',
  'Acheter un bien',
  'Estimation gratuite',
  'Investissement locatif',
  'Autre demande',
]

const inputCls =
  'bg-white border-black/[0.12] rounded-sm text-[var(--navy)] placeholder:text-[rgba(87,87,87,0.5)] focus-visible:border-[var(--red)] focus-visible:ring-[var(--red)]/[0.08] h-auto py-3.5 px-4 text-[0.9rem]'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    let ctx: { revert(): void } | null = null

    const init = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const d = { ease: 'power3.out', duration: .85 }
        sectionRef.current?.querySelectorAll<HTMLElement>('.rv').forEach(el =>
          gsap.fromTo(el, { opacity: 0, y: 44 }, { opacity: 1, y: 0, ...d, scrollTrigger: { trigger: el, start: 'top 87%' } }))
        sectionRef.current?.querySelectorAll<HTMLElement>('.rl').forEach(el =>
          gsap.fromTo(el, { opacity: 0, x: -44 }, { opacity: 1, x: 0, ...d, scrollTrigger: { trigger: el, start: 'top 87%' } }))
        sectionRef.current?.querySelectorAll<HTMLElement>('.rr').forEach(el =>
          gsap.fromTo(el, { opacity: 0, x: 44 }, { opacity: 1, x: 0, ...d, scrollTrigger: { trigger: el, start: 'top 87%' } }))
      }, sectionRef)
    }

    init()
    return () => { ctx?.revert() }
  }, [])

  const onSubmit = async (_data: FormData) => {
    await new Promise(r => setTimeout(r, 1200))
    setSent(true)
    reset()
    setTimeout(() => setSent(false), 4500)
  }

  return (
    <section id="contact" className="section" ref={sectionRef}>
      <div className="sec-eyebrow rv">
        <div className="sec-eye-line" />
        <span className="sec-eye-text">Nous contacter</span>
      </div>
      <h2 className="sec-title rv">Parlons de <em>votre projet</em></h2>
      <p className="sec-sub rv">Remplissez ce formulaire et un conseiller vous rappelle sous 24 heures.</p>

      <div className="contact-wrap">
        <form className="c-form rl" onSubmit={handleSubmit(onSubmit)} noValidate>

          <FieldGroup>

            {/* Prenom + Nom */}
            <div className="f-row">
              <Field data-invalid={!!errors.prenom}>
                <FieldLabel htmlFor="prenom">Prénom</FieldLabel>
                <Input
                  id="prenom" placeholder="Marie"
                  className={inputCls} aria-invalid={!!errors.prenom}
                  {...register('prenom')}
                />
                <FieldError errors={errors.prenom ? [errors.prenom] : []} />
              </Field>

              <Field data-invalid={!!errors.nom}>
                <FieldLabel htmlFor="nom">Nom</FieldLabel>
                <Input
                  id="nom" placeholder="Dupont"
                  className={inputCls} aria-invalid={!!errors.nom}
                  {...register('nom')}
                />
                <FieldError errors={errors.nom ? [errors.nom] : []} />
              </Field>
            </div>

            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                type="email" id="email" placeholder="marie@email.com"
                className={inputCls} aria-invalid={!!errors.email}
                {...register('email')}
              />
              <FieldError errors={errors.email ? [errors.email] : []} />
            </Field>

            <Field>
              <FieldLabel htmlFor="tel">Téléphone</FieldLabel>
              <Input
                type="tel" id="tel" placeholder="+33 6 00 00 00 00"
                className={inputCls}
                {...register('tel')}
              />
            </Field>

            <Field data-invalid={!!errors.projet}>
              <FieldLabel>Votre projet</FieldLabel>
              <Controller
                name="projet"
                control={control}
                render={({ field }) => (
                  <Select value={field.value ?? ''} onValueChange={field.onChange}>
                    <SelectTrigger className={`w-full ${inputCls} justify-between`}>
                      <SelectValue placeholder="Sélectionnez votre projet..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-black/[0.1] text-[var(--navy)] rounded-sm">
                      <SelectGroup>
                        {projets.map(p => (
                          <SelectItem
                            key={p} value={p}
                            className="focus:bg-[var(--red)]/[0.06] focus:text-[var(--navy)]"
                          >
                            {p}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={errors.projet ? [errors.projet] : []} />
            </Field>

            <Field>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <Textarea
                id="message"
                placeholder="Décrivez votre projet ou vos questions..."
                className={`${inputCls} min-h-[130px] resize-y`}
                {...register('message')}
              />
            </Field>

          </FieldGroup>

          <Button
            type="submit"
            disabled={isSubmitting || sent}
            className={`self-start mt-2 rounded-sm border-0 text-[0.75rem] font-medium tracking-[0.1em] uppercase h-auto px-7 py-3.5 gap-2 transition-transform hover:-translate-y-0.5 ${
              sent
                ? 'bg-[#1a7f4e] hover:bg-[#1a7f4e]'
                : 'bg-[var(--red)] hover:bg-[var(--red-dark)]'
            } text-[var(--offwhite)]`}
          >
            {sent ? 'Message envoyé ✓' : isSubmitting ? 'Envoi...' : (
              <>
                Envoyer la demande
                <ArrowRight data-icon="inline-end" className="size-3.5" />
              </>
            )}
          </Button>
        </form>

        <div className="c-info rr">
          <div className="c-item">
            <div className="c-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
            </div>
            <div>
              <h4>Adresse</h4>
              <p>16 Avenue Emile Zola<br/>75015 Paris, France</p>
            </div>
          </div>
          <div className="c-item">
            <div className="c-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.5 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 013.07 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </div>
            <div>
              <h4>Téléphone</h4>
              <a href="tel:+33145790010">+33 (0)1 45 79 00 10</a>
            </div>
          </div>
          <div className="c-item">
            <div className="c-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div>
              <h4>Email</h4>
              <a href="mailto:contact@immotec.com">contact@immotec.com</a>
            </div>
          </div>
          <div className="c-item">
            <div className="c-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <h4>Horaires d&apos;ouverture</h4>
              <p>Lun – Ven : 9h00 – 19h00<br/>Samedi : 10h00 – 17h00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
