program lab2;
uses crt;
const nmax=100;
var a:array[1..nmax] of integer;
    n,i,j,k,p:byte;
begin
clrscr;
randomize;
repeat
write('enter the size of the array up to 100.  Size= ');
readln(n);
until n in [1..nmax];
writeln('array:');
for i:=1 to n do
 begin
  readln(a[i]);
 end;
writeln;
i:=1;
while i<=n do
 begin
  write('array element =',a[i]:2);
  j:=i+1;
  k:=1;
  while j<=n do
   begin
    if a[j]=a[i] then
     begin
      k:=k+1;
      for p:=j to n-1 do
      a[p]:=a[p+1];
      n:=n-1;
     end
    else j:=j+1;
   end;
  writeln(k:4,' time.');
  i:=i+1;
 end;
readln
end.