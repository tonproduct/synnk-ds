import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const stats = [
  {
    title: "Receita total",
    value: "R$ 48.295",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    desc: "em relação ao mês anterior",
  },
  {
    title: "Usuários ativos",
    value: "2.350",
    change: "+180",
    trend: "up",
    icon: Users,
    desc: "desde a última semana",
  },
  {
    title: "Vendas",
    value: "1.247",
    change: "+19%",
    trend: "up",
    icon: TrendingUp,
    desc: "em relação ao mês anterior",
  },
  {
    title: "Taxa de conversão",
    value: "3,24%",
    change: "-0.4%",
    trend: "down",
    icon: Activity,
    desc: "em relação ao mês anterior",
  },
]

const recentActivity = [
  { user: "Ana Lima",      email: "ana@empresa.com",    status: "ativo",      amount: "R$ 1.200",  initials: "AL" },
  { user: "Bruno Costa",   email: "bruno@empresa.com",  status: "pendente",   amount: "R$ 890",    initials: "BC" },
  { user: "Carla Souza",   email: "carla@empresa.com",  status: "ativo",      amount: "R$ 2.450",  initials: "CS" },
  { user: "Diego Martins", email: "diego@empresa.com",  status: "inativo",    amount: "R$ 340",    initials: "DM" },
  { user: "Eva Santos",    email: "eva@empresa.com",    status: "ativo",      amount: "R$ 980",    initials: "ES" },
]

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  ativo:    "default",
  pendente: "secondary",
  inativo:  "outline",
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Visão geral</h2>
        <p className="text-muted-foreground text-sm">Métricas e atividades recentes da plataforma.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ title, value, change, trend, icon: Icon, desc }) => (
          <Card key={title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}>
                  {change}
                </span>{" "}
                {desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Receita mensal</CardTitle>
          <CardDescription>Jan – Dez 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-end gap-2">
            {[40, 65, 55, 80, 70, 90, 75, 95, 85, 100, 88, 92].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-sm bg-primary/80 hover:bg-primary transition-colors"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[11px] text-muted-foreground">
            {["J","F","M","A","M","J","J","A","S","O","N","D"].map((m) => (
              <span key={m} className="flex-1 text-center">{m}</span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade recente</CardTitle>
          <CardDescription>Últimas transações dos usuários.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map(({ user, email, status, amount, initials }) => (
                <TableRow key={email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">{user}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[status] ?? "outline"} className="capitalize">
                      {status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">{amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
