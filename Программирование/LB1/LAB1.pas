program LAb_work_1;
uses crt;
const 
   min = -8*10;
   max = 8*10;
   step = 0.1*10;
var
  i: integer;
  X: real;
  funcRes: real;
  showRes: boolean;
BEGIN
  i := min;
  while i <= max do
    begin
      X := i / 10;
      
      if (X < -6) then 
         begin
          funcRes:= 44;     //Считаю выражение и проверяю
          showRes:= true;
         end
       else if ((X >= -6) and (X < 0)) then
         begin
           funcRes:=sin(X)-cos(2*X);
           showRes := true;
         end
   
       else if ((X >= 0) and (X < 6)) then      // данные по условию ((v >= 0) and (v < 6), но невозможно посчитать ln(0)
         begin
           funcRes := ln(X)*52-X;
           showRes := true;
         end
       else if (X >= 6) then
         begin
           funcRes := (ln(X)/6)-((-X)/power(X,(0.1*X)));
           showRes := true;
         end;
      if showRes then
        begin
          write('x = ', X);
          write('; f(x) = ', funcRes:0:2);
          write(';');
          writeln('');
          showRes:= false;
        end;
      
       i := Trunc(i + step);       
    end;
    writeln
END.