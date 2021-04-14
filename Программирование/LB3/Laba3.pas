program laba3;
uses crt;
const
  m = 4;
   Menu: array[1..m]
  of string = 
     (' 1. Borders',
      ' 2. Step is',
      ' 3. Area and error',
      ' 4. Exit');
var
  s, en, sum, x1, x2, Nu, pog, pog1, sr, x, f, h1: real;
  h: real;
    z, i, n1, count: integer;
     n: real;
    cha: char;
procedure prst;
begin
  repeat
    clrscr;
        Textcolor(15);
        z := 0;
        writeln('Enter the first integration limit <-3');    
        readln(s);    
        writeln('Enter the second integration limit <4');
            readln(en);
            if s > en then begin
      writeln('Incorrect data');      
      readln;
                end
    else
          z := 1;        
  until z = 1;   
  writeln('Press enter to exit the menu');
    readln;    
end;
procedure prsd;
var
  st: string;
begin
  if count = 1 then
  begin
    repeat
      begin
        clrscr;
        z := 0;                
        Textcolor(15);                
        writeln('Enter the step');
        readln(h);
                if (h <= 0) or (h >= (en - s))
        then
        begin
          writeln('Incorrect number entry. Press enter and try again');
                    readln;
                            end;
             end;
    until (h > 0) and (h <= (en - s));
            writeln('Press enter to exit the menu.');
            readln;
  end
  else
  begin
    clrscr;
    textcolor(15);
    writeln('You didnt set boundaries.Press enter to exit the menu');
    readln;
  end;
end;
procedure prthd;
var
  ip: integer;
    sr1, sr2: real;
begin
  if count = 1 then
    if h <> 0 then
    begin
            Textcolor(15);
            clrscr;
            f := 0;
      sum := 0;
      n := (en - s) / h;
      h1 := en - s;
      n1 := round(n);
      for ip
      := 1 to n1
      do
      begin
        x := s + ip * h;
        sr1 := 2 * x * x * x + (-2) * x * x + (-5) * x + 12;
        if (ip > 0) and (ip < n1) then
          sr1 := sr1 * 2;
        if sr1 > 0 then
          sum := sum + sr1;
      end;
      sum := sum * (h / 2);
            writeln('Area is ', sum:0:13);
                  begin
        Nu := 0;
        while s <= en do
        begin
          x := s;
          f := abs(12 * x - 4);
          s := s + h;
          if f > Nu then Nu := f
                  end;
                nu := f * ((h1 * h1 * h1) / (12 * n1 * n1));
        pog := nu;
        pog1 := (nu / sum) * 100;
      end;      
            Writeln('Error is ', pog:0:13);
      Writeln('Error2 is ', pog:3:5, '%');      
      writeln('Press enter to exit the menu');
                  readln;
          end; 
end;
begin
  repeat
    Clrscr;    
    Textcolor(11);
    Gotoxy(50, 4); 
    Writeln('Laboratory work #3');
    Textcolor(10);
    Gotoxy(41, 5);
 Writeln('y= 2*x^3 + (-2)*x^2 + (-5)*x + (12)');
  Gotoxy(44, 6);
 Textcolor(15);
   for i
    := 1 to m
    do
   begin
      GotoXY(30, 8 + i);
   Write(Menu[i]);
   end;
      i := 1;
 TextColor(12);
 Gotoxy(30, 8 + i);
 Write(Menu[i]);
 repeat
      cha := readkey;
  case cha of
        #72:
          begin
            TextColor(15);
 Gotoxy(30, 8 + i);
  Write(Menu[i]);
 i := i - 1;
 if i
            < 1 then
              i := 4;
   Textcolor(12);
 Gotoxy(30, 8 + i);
  Write(Menu[i]);
end;
 #80:
  begin
 Textcolor(15);
  Gotoxy(30, 8 + i);
 Write(Menu[i]);
i := i + 1; if i
            > m then
              i := 1;
 Textcolor(12);
 gotoxy(30, 8 + i);
 Write(Menu[i]);
  end;
end;
 until cha =
    #13;
    case i of 1:
        begin
          count := 1;
          prst;
        end;
2: prsd;
3: prthd;
4:
  begin
          clrscr;
 Textcolor(15);          
          writeln('End of the program...');                    
          i := 0;                 
        end;
           end;
    
      until i = 0;
  end.