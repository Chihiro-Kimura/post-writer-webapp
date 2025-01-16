interface DashBoardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function DashBoardHeader({
  heading,
  text,
  children,
}: DashBoardHeaderProps) {
  return (
    <div className="flex justify-between items-center px-2">
      <div className="grid gap-1">
        <h1 className="text-3xl font-extrabold md:text-4xl">{heading}</h1>
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  );
}
