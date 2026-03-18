import { Home, MapPin, Crown } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-50 via-amber-100 to-slate-900 text-slate-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="luxury-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#luxury-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-start justify-between gap-8">
          {/* Logo and Main Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              {/* Logo Placeholder */}
              <div className="w-16 h-16 bg-amber-400 rounded-lg shadow-lg flex items-center justify-center">
                <Crown className="w-8 h-8 text-slate-900" />
              </div>
              <div>
                <h1 className="text-5xl font-bold text-slate-900 tracking-tight">GIARDINO</h1>
                <p className="text-amber-700 font-semibold">RESIDENCIAL SENIOR + CLUBE LIFESTYLE</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-600 font-semibold">LOCALIZAÇÃO</p>
                  <p className="text-lg font-semibold text-slate-900">Mogi das Cruzes, São Paulo</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Home className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-600 font-semibold">PROJETO</p>
                  <p className="text-lg font-semibold text-slate-900">258.900 m² de área</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Featured Image placeholder */}
          <div className="hidden lg:block w-64 h-48">
            <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden border-4 border-amber-400">
              <div className="text-center">
                <p className="text-4xl">🏢</p>
                <p className="text-xs text-amber-900 font-semibold mt-2">Fotos do Projeto</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"></div>
    </div>
  );
}
