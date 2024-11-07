export class FlagParser {
  // stupid regex to parse flags
  private static FLAG_REGEX = /--([a-zA-Z]+)(?:=(?:"([^"]+)"|([^\s]+)))?/g;

  // big ass function to parse flags
  static parse(args: string[]): { args: string[], flags: Record<string, string | boolean> } {
    const flags: Record<string, string | boolean> = {};
    const cleanArgs: string[] = [];
    const rawInput = args.join(' ');
    
    let match;
    const flagMatches: { start: number, end: number }[] = [];
    
    // i dont know why
    while ((match = this.FLAG_REGEX.exec(rawInput)) !== null) {
      const flagName = match[1];
      const quotedValue = match[2];
      const unquotedValue = match[3];
      
      flags[flagName] = quotedValue || unquotedValue || true;
      flagMatches.push({ start: match.index, end: match.index + match[0].length });
    }
    
    let currentPos = 0;
    let currentArg = '';
    
    for (let i = 0; i < rawInput.length; i++) {
      const flagMatch = flagMatches.find(m => i === m.start);
      if (flagMatch) {
        if (currentArg.trim()) {
          cleanArgs.push(currentArg.trim());
        }
        currentArg = '';
        i = flagMatch.end - 1;
        continue;
      }
      
      if (rawInput[i] === ' ') {
        if (currentArg.trim()) {
          cleanArgs.push(currentArg.trim());
        }
        currentArg = '';
      } else {
        currentArg += rawInput[i];
      }
    }
    
    if (currentArg.trim()) {
      cleanArgs.push(currentArg.trim());
    }

    return { args: cleanArgs, flags };
  }
} 