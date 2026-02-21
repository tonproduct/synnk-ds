"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InputWithLabel } from "@/components/ui/input-with-label"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight">Entrar</h1>
        <p className="text-sm text-muted-foreground">
          Insira suas credenciais para acessar a plataforma
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <InputWithLabel
          label="Email"
          type="email"
          placeholder="voce@empresa.com"
          autoComplete="email"
          required
        />

        <div className="space-y-2">
          <InputWithLabel
            label="Senha"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Esqueceu a senha?
            </Link>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>

      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
          ou continue com
        </span>
      </div>

      <Button variant="outline" className="w-full" type="button">
        <svg viewBox="0 0 24 24" className="size-4 mr-2" aria-hidden>
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
        Google
      </Button>
    </div>
  )
}
