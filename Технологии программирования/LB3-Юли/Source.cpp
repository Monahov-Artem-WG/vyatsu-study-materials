#include <windows.h>
#include <string>
#include <iomanip>
#include <windowsx.h>
#include <TCHAR.H>

using namespace std;

// Объявляем прототип CALLBACK функции
LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
LRESULT CALLBACK WndProcChild(HWND, UINT, WPARAM, LPARAM);

HWND hWndinp, hWndres, hWindow;

HWND editRow1, editColumn1, editRow2, editColumn2;
HWND buttonAccept, buttonShowResult;
HWND radioButtonTradMed, radioButtonShtrasMed;

HWND matrix_a_edit[16][16], matrix_b_edit[16][16], matrix_c_edit[16][16];
int matrix_a[16][16], matrix_b[16][16], matrix_c[16][16];
int n1, m1, n2, m2;
int flag_method = 0;
bool flag;


void mul_normal(int* c, int* a, int* b, int n)
{
	for (auto i = 0; i < n; i++)
		for (auto j = 0; j < n; j++)
		{
			c[i * n + j] = 0;
			for (auto k = 0; k < n; k++)
				c[i * n + j] += a[i * n + k] * b[k * n + j];
		}
}

//Сложение матриц
void mul(int* c, int* a, int* b, int n)
{
	for (auto i = 0; i < n * n; i++)
		c[i] = a[i] + b[i];

}

// Функция WinAPI для точки входа в программу
int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nShowCmd)
{
	/**
	 *@param HNDCLASSEX wParentClass - Переменная родительского класса
	 *@param HNDCLASSEX wChildClass - Переменная дочернего класса
	 */
	WNDCLASSEX wParentClass, wChildClass;
	/*
	 *@param const int p_x - Начальное горизонтальное положение окна
	 *@param const int p_y - Начальное вертикальное положение окна
	 *@param const int p_nWidth - Ширина окна
	 *@param const int p_nHeight - Высота окна
	 */
	const int p_x = 100, p_y = 50, p_nWidth = 800, p_nHeight = 500;
	/*
	*@param const int с_x - Начальное горизонтальное положение окна
	*@param const int с_y - Начальное вертикальное положение окна
	*@param const int с_nWidth - Ширина окна
	*@param const int с_nHeight - Высота окна
	*/
	const int c_x = 200, c_y = 100, c_nWidth = 800, c_nHeight = 500;

	// Регистрация класса окна
	ZeroMemory(&wParentClass, sizeof(wParentClass)); // Обнуляем память
	ZeroMemory(&wChildClass, sizeof(wChildClass)); // Обнуляем память

	// Заполняем структуру WNDCLASSEX
	wParentClass.cbSize = sizeof(wParentClass); // Размер структуры
	wParentClass.hbrBackground = (HBRUSH)COLOR_WINDOW + 6; // Определяем фон окна
	wParentClass.hInstance = hInstance; // hInstance window
	wParentClass.lpfnWndProc = (WNDPROC)WndProc; // Процедура обработки окна
	wParentClass.lpszClassName = L"PClass"; // Имя класса

	wChildClass.cbSize = sizeof(wChildClass);
	wChildClass.hbrBackground = (HBRUSH)COLOR_DESKTOP + 1;
	wChildClass.hInstance = hInstance;
	wChildClass.lpfnWndProc = (WNDPROC)WndProcChild;
	wChildClass.lpszClassName = L"CClass";

	// При ошибке 
	if (!RegisterClassEx(&wParentClass)) //Регестрируем класс окна
	{
		int nResult = GetLastError(); //Получаем значение кода последней ошибки
		MessageBox(NULL, L"Класс окна не был создан!", L"Ошибка", MB_ICONERROR);
	}

	if (!RegisterClassEx(&wChildClass))
	{
		int nResult = GetLastError();
		MessageBox(NULL, L"Класс окна не был создан!", L"Ошибка", MB_ICONERROR);
	}

	// Создаем родительское окно при помощи функции WinApi CreateWindowEx 
	hWindow = CreateWindowEx
	(
		NULL, //Расширенный стиль создаваемого окна
		L"PClass", // Имя класса, который мы определили ранее
		L"Умножение|Сложение матриц", // Имя окна
		WS_OVERLAPPEDWINDOW, //Cтиль создаваемого окна
		p_x,
		p_y,
		p_nWidth,
		p_nHeight,
		NULL, //Дескриптор родительского окна
		NULL, //Дескриптор меню окна
		hInstance, // переменная экземпляра приложения
		NULL //Дополнительные данные кот доступны через указатель
	);

	// Если окно не было создано, то выдаем сообщение
	if (!hWindow)
	{
		int nResult = GetLastError();
		MessageBox(NULL, L"Окно не было создано!", L"Ошибка", MB_ICONERROR);
	}

	//Создаем дочернее окно
	hWndinp = CreateWindowEx
	(
		NULL,
		L"CClass",
		L"Ввод матриц",
		WS_TILED,
		c_x,
		c_y,
		c_nWidth,
		c_nHeight,
		hWindow,
		NULL,
		hInstance,
		NULL
	);

	if (!hWndinp)
	{
		int nResult = GetLastError();
		MessageBox(NULL, L"Окно не было создано!", L"Ошибка", MB_ICONERROR);
	}

	// Показываем окно
	ShowWindow(hWindow, SW_SHOW);
	UpdateWindow(hWindow);

	// Объявляем переменную для сообщений типа MSG
	MSG msg;
	// Обнуляем память по размеру структуры MSG
	ZeroMemory(&msg, sizeof(MSG));

	// Цикл обработки сообщений
	while (GetMessage(&msg, NULL, 0, 0))
	{
		TranslateMessage(&msg);
		DispatchMessage(&msg);
	}

	return 0;
}

// определяем процедуру обратного вызова (WinApi)
LRESULT CALLBACK WndProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam)
{
	int tmpnum = 0;
	LPWSTR tmp = 0;
	char* err = NULL;
	char* Text = NULL;
	wchar_t strg[19] = L"Настройки: ";
	switch (uMsg)
	{
	case WM_CREATE:
	{
		CreateWindow(L"STATIC", strg, WS_VISIBLE | WS_CHILD, 20, 20, 100, 20, hwnd, NULL, NULL, NULL);


		CreateWindow(L"STATIC", L"Размер первой матрицы [0..9]:", WS_VISIBLE | WS_CHILD,
			20, 50, 350, 20, hwnd, NULL, NULL, NULL);
		editRow1 = CreateWindow(L"EDIT", L"", WS_VISIBLE | WS_CHILD | WS_BORDER | ES_NUMBER | ES_CENTER,
			250, 50, 40, 20, hwnd, NULL, NULL, NULL);
		Edit_LimitText(editRow1, 1);
		editColumn1 = CreateWindow(L"EDIT", L"", WS_VISIBLE | WS_CHILD | WS_BORDER | ES_NUMBER | ES_CENTER,
			300, 50, 40, 20, hwnd, NULL, NULL, NULL);
		Edit_LimitText(editColumn1, 1);



		CreateWindow(L"STATIC", L"Размер второй матрицы [0..9]:", WS_VISIBLE | WS_CHILD,
			20, 80, 350, 20, hwnd, NULL, NULL, NULL);
		editRow2 = CreateWindow(L"EDIT", L"", WS_VISIBLE | WS_CHILD | WS_BORDER | ES_NUMBER | ES_CENTER,
			250, 80, 40, 20, hwnd, NULL, NULL, NULL);
		Edit_LimitText(editRow2, 1);
		editColumn2 = CreateWindow(L"EDIT", L"", WS_VISIBLE | WS_CHILD | WS_BORDER | ES_NUMBER | ES_CENTER,
			300, 80, 40, 20, hwnd, NULL, NULL, NULL);
		Edit_LimitText(editColumn2, 1);



		buttonAccept = CreateWindow(L"BUTTON", L"Принять", WS_VISIBLE | WS_CHILD
			| WS_BORDER, 20, 110, 60, 20, hwnd, (HMENU)2, NULL, NULL);
		break;
	}

	case WM_COMMAND:
	{
		switch (LOWORD(wParam))
		{
			// Обработка команд (нажатие кнопок, мыши, полей ввода и т.д.)
		case 1:
		{
			ShowWindow(hwnd, SW_HIDE);
			EnableWindow(hWindow, TRUE);
			SetFocus(hWindow);
			break;
		}
		case 2:
		{
			//Удаление таблиц
			for (int i = 0; i < 16; i++)
			{
				for (int j = 0; j < 16; j++)
				{
					DestroyWindow(matrix_a_edit[i][j]);
					DestroyWindow(matrix_b_edit[i][j]);
				}
			}
			DestroyWindow(radioButtonTradMed);
			DestroyWindow(radioButtonShtrasMed);
			DestroyWindow(buttonShowResult);
			//Считывание размеров матриц
			Text = new char[GetWindowTextLength(editRow1) + 1];
			GetWindowTextA(editRow1, Text, GetWindowTextLength(editRow1) + 1);
			n1 = atoi(Text);
			delete(Text);

			Text = new char[GetWindowTextLength(editColumn1) + 1];
			GetWindowTextA(editColumn1, Text, GetWindowTextLength(editColumn1) + 1);
			m1 = atoi(Text);
			delete(Text);

			Text = new char[GetWindowTextLength(editRow2) + 1];
			GetWindowTextA(editRow2, Text, GetWindowTextLength(editRow2) + 1);
			n2 = atoi(Text);
			delete(Text);

			Text = new char[GetWindowTextLength(editColumn2) + 1];
			GetWindowTextA(editColumn2, Text, GetWindowTextLength(editColumn2) + 1);
			m2 = atoi(Text);
			delete(Text);

			if ((m1 < 1) | (n1 < 1) | (m2 < 1) | (n2 < 1))
			{
				MessageBox(hwnd, L"Введите число в промежутке от 1 до 9", L"Ошибка", MB_OK);
				return -1;
			}


			//Создание таблиц
			int i = 0;
			for (i = 0; i < n1; i++)
			{
				for (int j = 0; j < m1; j++)
				{
					matrix_a_edit[i][j] = CreateWindow(L"EDIT", L" ", WS_VISIBLE | WS_CHILD | WS_BORDER,
						j * 40 + 20, 140 + i * 25 + 25, 40, 25, hwnd, NULL, NULL, NULL);
				}
			}

			for (int i = 0; i < n2; i++)
			{
				for (int j = 0; j < m2; j++)
				{
					matrix_b_edit[i][j] = CreateWindow(L"EDIT", L" ", WS_VISIBLE | WS_CHILD | WS_BORDER,
						200 + j * 40 + 20, 140 + i * 25 + 25, 40, 25, hwnd, NULL, NULL, NULL);
				}
			}


			radioButtonTradMed = CreateWindow(L"BUTTON", L"Умножение матриц ", WS_VISIBLE | WS_CHILD
				| WS_BORDER | BS_AUTORADIOBUTTON, 20, 160 + i * 25 + 45, 300, 20, hwnd, (HMENU)4, NULL, NULL);

			radioButtonShtrasMed = CreateWindow(L"BUTTON", L"Сложение матриц", WS_VISIBLE | WS_CHILD
				| WS_BORDER | BS_AUTORADIOBUTTON, 20, 190 + i * 25 + 45, 300, 20, hwnd, (HMENU)5, NULL, NULL);

			buttonShowResult = CreateWindow(L"BUTTON", L"Показать результат", WS_VISIBLE | WS_CHILD
				| WS_BORDER, 20, 220 + i * 25 + 45, 150, 20, hwnd, (HMENU)6, NULL, NULL);


			break;
		}

		case 3:
		{
			SendMessage(radioButtonTradMed, BM_SETCHECK, BST_UNCHECKED, NULL);
			SendMessage(radioButtonShtrasMed, BM_SETCHECK, BST_CHECKED, NULL);
			EnableWindow(buttonShowResult, TRUE);
			break;
		}
		case 4:
		{
			if (n1 != m2)
			{
				MessageBox(hwnd, L"Число столбцов первой матрицы не соответсвует числу строк второй матрицы", L"Ошибка", MB_OK);
				flag = false;
				return -1;
			}
			else
			{
				flag_method = 1;
				EnableWindow(buttonShowResult, TRUE);
			}
			break;
		}
		case 5:
		{
			if ((m1 != m2) | (n2 != n1))
			{
				MessageBox(hwnd, L"Размерности матриц должны быть одинаковыми", L"Ошибка", MB_OK);
				flag = false;
				return -1;
			}
			else
			{
				flag = true;
				flag_method = 2;
				EnableWindow(buttonShowResult, TRUE);
			}

			break;
		}
		case 6:
		{
			for (auto i = 0; i < 16; i++)
			{
				for (auto j = 0; j < 16; j++)
				{
					matrix_c[i][j] = 0;
				}
			}
			try
			{
				for (int i = 0; i < n1; i++)
				{
					for (int j = 0; j < m1; j++)
					{
						Text = new char[GetWindowTextLength(matrix_a_edit[i][j]) + 1];
						GetWindowTextA(matrix_a_edit[i][j], Text, GetWindowTextLength(matrix_a_edit[i][j]) + 1);
						matrix_a[i][j] = strtod(Text, &err);
						if (*err)
						{
							throw 3;
						}
						delete(Text);
					}
				}
			}
			catch (...)
			{
				MessageBox(hwnd, L"Введите числа!", L"Ошибка", MB_OK);
				for (int i = 0; i < 16; i++)
				{
					for (int j = 0; j < 16; j++)
					{
						DestroyWindow(matrix_a_edit[i][j]);
						DestroyWindow(matrix_b_edit[i][j]);
					}
				}
				DestroyWindow(radioButtonTradMed);
				DestroyWindow(radioButtonShtrasMed);
				DestroyWindow(buttonShowResult);
				return -1;
			}
			try
			{
				for (int i = 0; i < n2; i++)
				{
					for (int j = 0; j < m2; j++)
					{
						Text = new char[GetWindowTextLength(matrix_b_edit[i][j]) + 1];
						GetWindowTextA(matrix_b_edit[i][j], Text, GetWindowTextLength(matrix_b_edit[i][j]) + 1);
						matrix_b[i][j] = strtod(Text, &err);
						if (*err)
						{
							throw 3;
						}
						delete(Text);
					}
				}
			}
			catch (...)
			{
				MessageBox(hWndinp, L"Введите число!", L"Ошибка", MB_OK);
				for (int i = 0; i < 16; i++)
				{
					for (int j = 0; j < 16; j++)
					{
						DestroyWindow(matrix_a_edit[i][j]);
						DestroyWindow(matrix_b_edit[i][j]);
					}
				}
				DestroyWindow(radioButtonTradMed);
				DestroyWindow(radioButtonShtrasMed);
				DestroyWindow(buttonShowResult);
				return -1;
			}
			if (flag_method == 1) {
				mul_normal((int*)matrix_c, (int*)matrix_a, (int*)matrix_b, 16);
			}
			else if (flag_method == 2)
			{
				mul((int*)matrix_c, (int*)matrix_a, (int*)matrix_b, 16);
			}
			ShowWindow(hWndinp, SW_SHOW);
			EnableWindow(hWindow, FALSE);
			break;

		}
		}
		break;
	}

	case WM_DESTROY: // Обработка нажатия кнопки закрытия окна
	{
		// команда Закрыть окно
		PostQuitMessage(0);
		return 0;
	}
	}
	return DefWindowProc(hwnd, uMsg, wParam, lParam);
}

LRESULT CALLBACK WndProcChild(HWND hWndinp, UINT uMsg, WPARAM wParam, LPARAM lParam)
{
	switch (uMsg)
	{
	case WM_CREATE:
	{
		CreateWindow(L"BUTTON", L"Показать/Обновить результат умножения", WS_VISIBLE | WS_CHILD
			| WS_BORDER, 20, 20, 300, 20, hWndinp, (HMENU)2, NULL, NULL);
		CreateWindow(L"BUTTON", L"Закрыть", WS_VISIBLE | WS_CHILD
			| WS_BORDER, 20, 50, 90, 20, hWndinp, (HMENU)1, NULL, NULL);

		break;
	}
	case WM_COMMAND:
	{
		switch (LOWORD(wParam))
		{
			// Обработка команд (нажатие кнопок, мыши, полей ввода и т.д.)
		case 1:
		{
			ShowWindow(hWndinp, SW_HIDE);
			EnableWindow(hWindow, TRUE);
			SetFocus(hWindow);
			break;
		}
		case 2:
		{
			if (flag = true)
			{
				for (int i = 0; i < 16; i++)
				{
					for (int j = 0; j < 16; j++)
					{
						DestroyWindow(matrix_c_edit[i][j]);
					}
				}
				std::string buf;
				for (int i = 0; i < n1; i++)
				{
					for (int j = 0; j < m2; j++)
					{
						buf = to_string(matrix_c[i][j]);
						matrix_c_edit[i][j] = CreateWindow(L"EDIT", L"", WS_VISIBLE | WS_CHILD | WS_BORDER | ES_READONLY | ES_CENTER,
							j * 80 + 20, 80 + i * 25 + 25, 80, 25, hWndinp, NULL, NULL, NULL);
						SetWindowTextA(matrix_c_edit[i][j], buf.c_str());
					}
				}
			}
			else
			{
				for (int i = 0; i < 16; i++)
				{
					for (int j = 0; j < 16; j++)
					{
						DestroyWindow(matrix_c_edit[i][j]);
					}
				}
				std::string buf;
				for (int i = 0; i < n1; i++)
				{
					for (int j = 0; j < m2; j++)
					{
						//buf = ;
						matrix_c_edit[i][j] = CreateWindow(L"EDIT", L"", WS_VISIBLE | WS_CHILD | WS_BORDER | ES_READONLY | ES_CENTER,
							j * 80 + 20, 80 + i * 25 + 25, 80, 25, hWndinp, NULL, NULL, NULL);
						//SetWindowTextA(0, buf.c_str());
					}
				}
			}
			break;
		}
		}
		break;
	case WM_DESTROY:
	{
		PostQuitMessage(0);
		return 0;
	}
	default:
		return DefWindowProc(hWndinp, uMsg, wParam, lParam);
	}
	}
}