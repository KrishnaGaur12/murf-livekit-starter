export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full bg-background/80 backdrop-blur-md border-t border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8 text-xs font-medium text-muted-foreground">
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Accessibility</a>
          <a href="#" className="hover:text-foreground transition-colors hidden sm:block">Government Services</a>
        </div>
        <div className="flex items-center gap-2">
          <span>Powered by Murf Falcon</span>
        </div>
      </div>
    </footer>
  );
}
