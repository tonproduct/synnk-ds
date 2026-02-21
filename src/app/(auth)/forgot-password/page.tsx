"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InputWithLabel } from "@/components/ui/input-with-label"
import { ArrowLeft, MailCheck } from "lucide-react"

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState("")

  if (sent) {
    return (
      <div className="space-y-6">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <MailCheck className="size-5 text-foreground" />
        </div>
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight">Verifique seu email</h1>
          <p className="text-sm text-muted-foreground">
            Enviamos um link de recuperação para{" "}
            <span className="font-medium text-foreground">{email}</span>.
            Verifique também a caixa de spam.
          </p>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setSent(false)}
        >
          Tentar outro email
        </Button>
        <Link
          href="/login"
          className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Voltar para o login
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight">Recuperar senha</h1>
        <p className="text-sm text-muted-foreground">
          Informe seu email e enviaremos um link para redefinir sua senha
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          setSent(true)
        }}
      >
        <InputWithLabel
          label="Email"
          type="email"
          placeholder="voce@empresa.com"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type="submit" className="w-full">
          Enviar link de recuperação
        </Button>
      </form>

      <Link
        href="/login"
        className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        Voltar para o login
      </Link>
    </div>
  )
}
