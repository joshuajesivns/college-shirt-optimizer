import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import ShirtPreview2D from "@/components/ShirtPreview2D";
import DesignPanel from "@/components/DesignPanel";

const queryClient = new QueryClient();

function Home() {
  return (
    <main className="relative w-full h-[100dvh] overflow-hidden bg-background text-foreground flex flex-col md:flex-row dark">
      {/* 2D Preview */}
      <div className="flex-1 h-full relative overflow-hidden">
        <ShirtPreview2D />
      </div>

      {/* UI Panel */}
      <div className="absolute top-auto bottom-0 left-0 right-0 w-full h-[50vh] md:relative md:top-0 md:h-full md:w-[480px] z-10 p-4 md:p-6 pb-safe md:pb-6 pointer-events-none">
        <div className="w-full h-full pointer-events-auto">
          <DesignPanel />
        </div>
      </div>
    </main>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
