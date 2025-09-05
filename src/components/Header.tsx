import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-6">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">L</span>
          </div>
          <span className="text-white font-semibold text-xl">Lovebusiness</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white/80 hover:text-white transition-colors">
            Comunidade
          </a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">
            Preços
          </a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">
            Empresarial
          </a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">
            Aprender
          </a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">
            Lançado
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Entrar
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Começar
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;