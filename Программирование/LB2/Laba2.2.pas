program lab2_2;

var
  a: array [1..100] of integer;
  o: array [1..100] of integer;
  s, f: string;
  b, l, z, i, N, m, k, count: integer;
  c: char;

begin
  count := 0;
  N := 1;
  z := 1;
  writeln('given string: ');
  readln(s);
  writeln('given substring (the substring size is smaller than the string size: ');
  readln(f);
  k := 1;
  m := 1;
  for i := 1 to length(s) do
    if l = length(f) then 
    begin
      o[k] := i - 1;
      k := k + 1;
      count := count + 1;
      l := 0;
      m := i;
    end
    else begin
      m := i;
      for n := 1 to length(f) do
       if m=length(s)+1 then break else begin
        if s[m] = f[n] then
        begin
          l := l + 1;
          m := m + 1;
        end else
        begin
         
         
         l := 0;
          break;
        end;
    end;
    end;
    
  
  begin
    for i := 1 to length(f) div 2 do 
    
    
    begin
      c := f[i]; 
      f[i] := f[length(f) - i + 1]; 
      f[length(f) - i + 1] := c; 
    end;
    
    
    
    begin
      
      for m := 1 to count do
      begin
        z := 1;
        for b := (o[m]) to (o[m] + length(f) - 1) do 
          if o[m] = 0 then break else begin
            
            s[b] := f[z];
            z := z + 1;
          end;
        
      end;
      
    end;
    if o[1]=0 then writeln ('No Substring') else
    writeln('Result: ', s);
    
  end;
  readln;
end.