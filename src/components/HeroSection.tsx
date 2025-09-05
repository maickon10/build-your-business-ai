import ChatInterface from "./ChatInterface";

const HeroSection = () => {
  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 gradient-hero"></div>
      <div className="absolute inset-0 hero-glow"></div>
      <div className="absolute inset-0 gradient-overlay"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              Crie algo{" "}
              <span className="inline-flex items-center gap-2">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl md:text-3xl">L</span>
                </div>
                Lovebusiness
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
              Desenvolva empresas e negócios conversando com IA
            </p>
          </div>

          {/* Chat Interface */}
          <div className="mt-12">
            <ChatInterface />
          </div>

          {/* Public/Private Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="flex items-center gap-2 glass-card rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-white/80 text-sm">Público</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Workspace Preview */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="glass-card rounded-t-3xl mx-6">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">M</span>
                </div>
                <span className="text-white font-medium">Maickon's Lovable's Workspace</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white/60 text-sm">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;