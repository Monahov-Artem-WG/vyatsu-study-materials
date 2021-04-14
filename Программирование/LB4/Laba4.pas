program LAB4;

uses
  wincrt,
  graph,
  crt;

const
  point = -1.92287567539349;      //the root of the equation
  colact = white;
  colpas = red;
  m = 4;
var
  h: real;                       //step
  x1, x2, temp: double;
  x, y, pt, i, n: integer;
  menu: array[1..5] of string;
  ch: char;

procedure mainmenu;
var
  j: integer;
begin
  clrscr;
  for j := 1 to m do
  begin
    gotoxy(x, y + j - 1);
    write(menu[j]);
  end;
  Textattr := colpas;
  gotoxy(x, y + pt - 1);
  write(menu[pt]);
  Textattr := colact;
end;

function Integral(x: double): double;
begin
  Integral := 2 * x * x * x - 2 * x * x - 5 * x + 12;
end;

function Pervoobr(x: double): double;
begin
  Pervoobr := x * x * x * x / 2 - 2 * x * x * x / 3 - 5 * x * x / 2 + 12 * x;
end;

function Trapezium(a, b: double): double;
var
  num_step: real;
  step, S: double;
  i, j: integer;
begin
  Trapezium := 0;
  num_step := (b - a) / h;                         //number of steps
  j := round(num_step);
  b := a + h;
  S := 0;
  for i := 1 to j do
  begin
    S := S + (Integral(a) + Integral(b)) / 2;
    a := b;
    b := b + h;
  end;
  Trapezium := S * h;                        //area
end;

procedure Value;
var
  s: string;
  eror: integer;
begin
  repeat
    clrscr;
    writeln(' Enter left limit -30 to 30');
    readln(s);
    val(s, x1, eror);
  until (eror = 0) and (x1 >= -30) and (x1 <= 30);

  repeat
    clrscr;
    writeln(' Enter right limit -30 to 30');
    readln(s);
    val(s, x2, eror);
  until (eror = 0) and (x2 >= -30) and (x2 <= 30);

  repeat
    clrscr;
    writeln(' Enter the step');
    readln(s);
    val(s, h, eror);
  until (eror = 0) and (h > 0) and (h <= abs(x2 - x1));
  if x1 > x2 then
  begin
    //  if the left value is greater than the right, then swap
    temp := x1;
    x1 := x2;
    x2 := temp;
  end;
  //if the left or right value is to the left of the reference point 
  if x1 < point then
    x1 := point;
  if x2 < point then
    x2 := point;
end;

procedure result;
begin
  clrscr;
  if x1 <> x2 then
  begin
    writeln('Newton-Leibniz figure area = ', Pervoobr(x2) - Pervoobr(x1): 5: 5);
    writeln('Trapezoid area = ', Trapezium(x1, x2): 5: 5);
    writeln('Absolute error = ', abs(Pervoobr(x2) - Pervoobr(x1) - Trapezium(x1, x2)): 5: 5);
    writeln('Reletive error = ', abs(1 - Trapezium(x1, x2) / (Pervoobr(x2) - Pervoobr(x1))) * 100: 5: 7, ' % ');
  end
  else
    writeln('Area is zero');
  readln;
end;

procedure grapf;
var
  p, gd, gm, x, i, j, z: integer;
  l, oo: real;
  c: longint;
  s: string;
  ch2: char;
begin
  z := 3;
  c := 5000;
  gd := Detect;
  gm := GetMaxMode;
  initgraph(gd, gm, '');

  repeat
    line(400 + 500, 0, 400 + 500, 800);
    line(0 + 500, 400, 800 + 500, 400);
    setcolor(4);
    SetTextStyle(1, 0, 2);
    {Schedule panel}
    OuttextXY(getmaxx - 500, 710, 'x^4/2-2x^3/3-5x^2+12x');
    OuttextXY(getmaxx - 500, 725, 'Scaling up');
    OuttextXY(getmaxx - 500, 740, 'for + type in "+"');
    OuttextXY(getmaxx - 500, 755, 'for - type in "-"');
    OuttextXY(getmaxx - 500, 770, 'for +ox type in  D');
    OuttextXY(getmaxx - 500, 785, 'for -ox type in  A');
    OuttextXY(getmaxx - 500, 800, 'for +oy type in  W');
    OuttextXY(getmaxx - 500, 815, 'for -oy type in  S');
    OuttextXY(getmaxx - 500, 835, 'The metod of trapezium');
    OuttextXY(getmaxx - 500, 855, 'Exit "ESC"');
    x := 0;
    setcolor(15);
    SetTextStyle(0, 0, 1);
    for i := 0 to 16 do
    begin
      line(x + 500, 380, x + 500, 420);
      str(i * z - 8 * z, s);
      OutTextXY(x + 500, 380, s);
      line(880, x, 920, x);
      str(8 * c - i * c, s);
      OutTextXY(900, x + 10, s);
      x := x + 50;
    end;
    p := 0;
    oo := 8 * c / 400;
    while p <= 800 do
    begin
      l := -(Integral(((p - 400) * z / 50))) / oo + 400;
      PutPixel(p + 500, round(l), 9);
      setcolor(5);                                //Hatching of the integrand
      if (p > ((x1 * 50) / z + 400)) and (p < (x2 * 50) / z + 400) and (round(l) <= 400) then
        line(p + 500, round(l), p + 500, 400);
      setcolor(7);
      p := p + 1;
    end;
    ch2 := wincrt.readkey;

    case ch2 of
      #119: if c < 10000 then
        begin
          c := c + 1000;           //for +oy
          cleardevice;
        end;
      #115: if c > 1000 then
        begin
          c := c - 1000;             //for -oy
          cleardevice;
        end;
      #97: if z > 1 then
        begin                           //for -ox
          z := z - 1;
          cleardevice;
        end;
      #100: if z < 4 then
        begin                          //for +ox
          z := z + 1;
          cleardevice;
        end;
      #45: if (z > 1) and (c > 1000) then
        begin          //for -
          z := z - 1;
          c := c - 1000;
          cleardevice;
        end;
      #61: if (z < 4) and (c < 10000) then
        begin        //for + 
          z := z + 1;
          c := c + 1000;
          cleardevice;
        end;
    end;
  until (ch2 = #27);
  closegraph;
end;

begin
  clrscr;
  menu[1] := ' Limit';
  menu[2] := ' Result';
  menu[3] := ' Graphic image';
  menu[4] := ' Exit';
  pt := 1;
  x := 5;
  y := 5;
  Textattr := colact;
  mainmenu;
  repeat
    Textcolor(11);
    Gotoxy(50, 2);
    writeln('Laboratory work #3');
    Textcolor(10);
    Gotoxy(44, 3);
    writeln('y= 2*x^3 + (-2)*x^2 + (-5)*x + (12)');
    Gotoxy(44, 4);
    writeln('Root of the equation: ', point: 0: 13);
    Textcolor(15);
    ch := readkey;
    if ch = #0 then
    begin
      ch := readkey;
      case ch of
        #80: if pt <= m then
          begin
            gotoxy(x, y + pt - 1);
            write(menu[pt]);
            pt := pt + 1;
            if pt = m + 1 then
              pt := 1;
            Textattr := colpas;
            gotoxy(x, y + pt - 1);
            write(menu[pt]);
            Textattr := colact;
          end;
        #72: if pt >= 1 then
          begin                  // colact = жёлтый 
            // colpas = зелёный
            gotoxy(x, y + pt - 1);
            write(menu[pt]);
            pt := pt - 1;
            if pt = 0 then
              pt := m;
            Textattr := colpas;
            gotoxy(x, y + pt - 1);
            write(menu[pt]);
            Textattr := colact;
          end;
      end;
    end
    else if ch = #13 then
    begin
      case pt of
        1: Value;
        2: result;
        3: Grapf;
        4: exit;
      end;
      mainmenu;
    end;
  until (ch = #27);
  readln;
end.
