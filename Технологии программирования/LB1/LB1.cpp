#include <vector>
#include "windows.h"
#include <iostream>
#include <list>
#include <string>
#include <sstream>
using namespace std;

list <string> lst;

bool finde(char CharStr, string ArrayStr) {

	for (int i = 0; i < ArrayStr.length(); i++)
	{
		if ((CharStr) == ArrayStr[i]) {
			return true;
		}

	}
	return false;

}


int search(string str) {
	string arr1 = "бвгджзлкмнпрстфчхцшщБВГДЖЗЛКМНПРСТФЧХЦШЩ";
	string arr2 = "аеёдийоуэюяАЕЁДИЙОУЭЮЯ";
	string arr3 = "ъьыЪЬЫ";
	/*string LowerSTR =_tolower(str)*/;
	if (str.length() >= 2) {
		for (int i = 2; i < str.length(); i++)
		{
			if ((finde(str[i - 2], arr1) && finde(str[i - 1], arr1) && finde(str[i], arr1)) || (finde(str[i - 2], arr2) && finde(str[i - 1], arr2) && finde(str[i], arr2)) || finde(str[0], arr3) || (finde(str[i - 2], arr3) && finde(str[i - 1], arr3) && finde(str[i], arr3))) {
				return 1;
			}
		}
	}
	else {
	}
	return 0;
}


int generate(int k, string A) {
	if (k == 1) {
		int flag = search(A);
		for (auto i = lst.begin(); i != lst.end(); i++) // выводим слова из списка
		{
			if ((*i == A) || (flag == 1)) { return 0; }
		}
		lst.push_back(A);
		return 1;
	}
	else {
		for (int i = 0; i < k; i++) {
			generate(k - 1, A);
			if (k % 2 == 0) {
				swap(A[0], A[k - 1]);
			}
			else
			{
				swap(A[i], A[k - 1]);
			}

		}
	}
}



int inputArr(vector<char>& inputData)
{
	lst.clear();
	string elem = "";
	int count = 1;
	cout << "Введите строку: ";
	cin >> elem;
	cout << "\nКомпбинации слов: ";
	generate(elem.length(), elem);
	lst.pop_front();
	for (auto i = lst.begin(); i != lst.end(); i++) // выводим слова из списка
		cout << *i << ' ';

	cout << endl;
	return 1;
}

bool isNumber(string s) {
	for (int a = 0; a < (s.length()); a++) {
		// Если в строке есть не цифровые символы, то это не число
		if (s[a] != 43) { // Проверка на знак минус
			if ((s[a] < 48) || (s[a] > 57))  return false;
		}

	}
	// Если в строке только цифровые символы значит это число
	return true;
}

int inputArr(vector<int>& inputData)
{
	char LenEquat[256];
	int counter = 0;
	int inputElement;
	int elem = 0;

	do
	{
		if (counter > 0) cout << "Недопустимые входные данные" << endl;
		cout << "Введите начало диапазона" << endl;
		cin >> LenEquat;
		cout << "\n";
		counter++;
	} while (!(isNumber(LenEquat)));
	inputElement = atoi(LenEquat);
	inputData.push_back(inputElement);
	cout << "\n";
	counter = 0;
	do
	{
		if (counter > 0) cout << "Недопустимые входные данные" << endl;
		cout << "Введите конец диапазона;" << endl;
		cin >> LenEquat;
		cout << "\n";
		counter++;
	} while (!(isNumber(LenEquat)));
	inputElement = atoi(LenEquat);
	inputData.push_back(inputElement);
	cout << "\n";
	if (inputData.at(0) > inputData.at(1)) {
		int c = inputData.at(1);
		inputData.at(1) = inputData.at(0);
		inputData.at(0) = c;

	}
	elem = rand() % (inputData.at(1) - inputData.at(0) + 1) + inputData.at(0);
	cout << "Диапазон: ";
	cout << inputData.at(0);
	cout << " - ";
	cout << inputData.at(1);
	cout << " Случайное число равно: ";
	cout << elem << endl;
	return 1;
}



template<class Type>
int testing(vector<Type> data)
{
	Type  elem = inputArr(data);
	return 1;

}


int main()
{
	SetConsoleCP(1251);
	SetConsoleOutputCP(1251);

	vector<int> dataInt;
	vector<char> dataChar;
	int variant;
	char LenEquit[256];

	while (true)
	{
		system("cls");
		cout << "1. Int\n2. Char\n3. Выход" << endl;
		cin >> LenEquit;
		if (isNumber(LenEquit)) { variant = atoi(LenEquit); }
		else { variant = 120; }
		switch (variant)
		{
		case 1:
		{
			testing(dataInt);
			system("pause");
			break;
		}
		case 2:
		{
			testing(dataChar);
			system("pause");
			break;
		}
		case 3:
		{
			system("pause");
			exit(0);
		}
		default:
		{
			cout << "Введенная команда неопределена" << endl;
			system("pause");
			break;
		}
		}
	}

}
