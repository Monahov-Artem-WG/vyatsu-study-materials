#include <windows.h>
#include <string>
#include <iomanip>
#include <windowsx.h>
#include <TCHAR.H>

using namespace std;

// ��������� �������� CALLBACK �������
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

//�������� ������
void mul(int* c, int* a, int* b, int n)
{
	for (auto i = 0; i < n * n; i++)
		c[i] = a[i] + b[i];

}

// ������� WinAPI ��� ����� ����� � ���������
int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nShowCmd)
{
	/**
	 *@param HNDCLASSEX wParentClass - ���������� ������������� ������
	 *@param HNDCLASSEX wChildClass - ���������� ��������� ������
	 */
	WNDCLASSEX wParentClass, wChildClass;
	/*
	 *@param const int p_x - ��������� �������������� ��������� ����
	 *@param const int p_y - ��������� ������������ ��������� ����
	 *@param const int p_nWidth - ������ ����
	 *@param const int p_nHeight - ������ ����
	 */
	const int p_x = 100, p_y = 50, p_nWidth = 800, p_nHeight = 500;
	/*
	*@param const int �_x - ��������� �������������� ��������� ����
	*@param const int �_y - ��������� ������������ ��������� ����
	*@param const int �_nWidth - ������ ����
	*@param const int �_nHeight - ������ ����
	*/
	const int c_x = 200, c_y = 100, c_nWidth = 800, c_nHeight = 500;

	// ����������� ������ ����
	ZeroMemory(&wParentClass, sizeof(wParentClass)); // �������� ������
	ZeroMemory(&wChildClass, sizeof(wChildClass)); // �������� ������

	// ��������� ��������� WNDCLASSEX
	wParentClass.cbSize = sizeof(wParentClass); // ������ ���������
	wParentClass.hbrBackground = (HBRUSH)COLOR_WINDOW + 6; // ���������� ��� ����
	wParentClass.hInstance = hInstance; // hInstance window
	wParentClass.lpfnWndProc = (WNDPROC)WndProc; // ��������� ��������� ����
	wParentClass.lpszClassName = L"PClass"; // ��� ������

	wChildClass.cbSize = sizeof(wChildClass);
	wChildClass.hbrBackground = (HBRUSH)COLOR_DESKTOP + 1;
	wChildClass.hInstance = hInstance;
	wChildClass.lpfnWndProc = (WNDPROC)WndProcChild;
	wChildClass.lpszClassName = L"CClass";

	// ��� ������ 
	if (!RegisterClassEx(&wParentClass)) //������������ ����� ����
	{
		int nResult = GetLastError(); //�������� �������� ���� ��������� ������
		MessageBox(NULL, L"����� ���� �� ��� ������!", L"������", MB_ICONERROR);
	}

	if (!RegisterClassEx(&wChildClass))
	{
		int nResult = GetLastError();
		MessageBox(NULL, L"����� ���� �� ��� ������!", L"������", MB_ICONERROR);
	}

	// ������� ������������ ���� ��� ������ ������� WinApi CreateWindowEx 
	hWindow = CreateWindowEx
	(
		NULL, //����������� ����� ������������ ����
		L"PClass", // ��� ������, ������� �� ���������� �����
		L"���������|�������� ������", // ��� ����
		WS_OVERLAPPEDWINDOW, //C���� ������������ ����
		p_x,
		p_y,
		p_nWidth,
		p_nHeight,
		NULL, //���������� ������������� ����
		NULL, //���������� ���� ����
		hInstance, // ���������� ���������� ����������
		NULL //�������������� ������ ��� �������� ����� ���������
	);

	// ���� ���� �� ���� �������, �� ������ ���������
	if (!hWindow)
	{
		int nResult = GetLastError();
		MessageBox(NULL, L"���� �� ���� �������!", L"������", MB_ICONERROR);
	}

	//������� �������� ����
	hWndinp = CreateWindowEx
	(
		NULL,
		L"CClass",
		L"���� ������",
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
		MessageBox(NULL, L"���� �� ���� �������!", L"������", MB_ICONERROR);
	}

	// ���������� ����
	ShowWindow(hWindow, SW_SHOW);
	UpdateWindow(hWindow);

	// ��������� ���������� ��� ��������� ���� MSG
	MSG msg;
	// �������� ������ �� ������� ��������� MSG
	ZeroMemory(&msg, sizeof(MSG));

	// ���� ��������� ���������
	while (GetMessage(&msg, NULL, 0, 0))
	{
		TranslateMessage(&msg);
		DispatchMessage(&msg);
	}

	return 0;
}

// ���������� ��������� ��������� ������ (WinApi)
LRESULT CALLBACK WndProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam)
{
	int tmpnum = 0;
	LPWSTR tmp = 0;
	char* err = NULL;
	char* Text = NULL;
	wchar_t strg[19] = L"���������: ";
	switch (uMsg)
	{
	case WM_CREATE:
	{
		CreateWindow(L"STATIC", strg, WS_VISIBLE | WS_CHILD, 20, 20, 100, 20, hwnd, NULL, NULL, NULL);


		CreateWindow(L"STATIC", L"������ ������ ������� [0..9]:", WS_VISIBLE | WS_CHILD,
			20, 50, 350, 20, hwnd, NULL, NULL, NULL);
		editRow1 = CreateWindow(L"EDIT", L"", WS_VISIBLE | WS_CHILD | WS_BORDER | ES_NUMBER | ES_CENTER,
			250, 50, 40, 20, hwnd, NULL, NULL, NULL);
		Edit_LimitText(editRow1, 1);
		editColumn1 = CreateWindow(L"EDIT", L"", WS_VISIBLE | WS_CHILD | WS_BORDER | ES_NUMBER | ES_CENTER,
			300, 50, 40, 20, hwnd, NULL, NULL, NULL);
		Edit_LimitText(editColumn1, 1);



		CreateWindow(L"STATIC", L"������ ������ ������� [0..9]:", WS_VISIBLE | WS_CHILD,
			20, 80, 350, 20, hwnd, NULL, NULL, NULL);
		editRow2 = CreateWindow(L"EDIT", L"", WS_VISIBLE | WS_CHILD | WS_BORDER | ES_NUMBER | ES_CENTER,
			250, 80, 40, 20, hwnd, NULL, NULL, NULL);
		Edit_LimitText(editRow2, 1);
		editColumn2 = CreateWindow(L"EDIT", L"", WS_VISIBLE | WS_CHILD | WS_BORDER | ES_NUMBER | ES_CENTER,
			300, 80, 40, 20, hwnd, NULL, NULL, NULL);
		Edit_LimitText(editColumn2, 1);



		buttonAccept = CreateWindow(L"BUTTON", L"�������", WS_VISIBLE | WS_CHILD
			| WS_BORDER, 20, 110, 60, 20, hwnd, (HMENU)2, NULL, NULL);
		break;
	}

	case WM_COMMAND:
	{
		switch (LOWORD(wParam))
		{
			// ��������� ������ (������� ������, ����, ����� ����� � �.�.)
		case 1:
		{
			ShowWindow(hwnd, SW_HIDE);
			EnableWindow(hWindow, TRUE);
			SetFocus(hWindow);
			break;
		}
		case 2:
		{
			//�������� ������
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
			//���������� �������� ������
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
				MessageBox(hwnd, L"������� ����� � ���������� �� 1 �� 9", L"������", MB_OK);
				return -1;
			}


			//�������� ������
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


			radioButtonTradMed = CreateWindow(L"BUTTON", L"��������� ������ ", WS_VISIBLE | WS_CHILD
				| WS_BORDER | BS_AUTORADIOBUTTON, 20, 160 + i * 25 + 45, 300, 20, hwnd, (HMENU)4, NULL, NULL);

			radioButtonShtrasMed = CreateWindow(L"BUTTON", L"�������� ������", WS_VISIBLE | WS_CHILD
				| WS_BORDER | BS_AUTORADIOBUTTON, 20, 190 + i * 25 + 45, 300, 20, hwnd, (HMENU)5, NULL, NULL);

			buttonShowResult = CreateWindow(L"BUTTON", L"�������� ���������", WS_VISIBLE | WS_CHILD
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
				MessageBox(hwnd, L"����� �������� ������ ������� �� ������������ ����� ����� ������ �������", L"������", MB_OK);
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
				MessageBox(hwnd, L"����������� ������ ������ ���� �����������", L"������", MB_OK);
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
				MessageBox(hwnd, L"������� �����!", L"������", MB_OK);
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
				MessageBox(hWndinp, L"������� �����!", L"������", MB_OK);
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

	case WM_DESTROY: // ��������� ������� ������ �������� ����
	{
		// ������� ������� ����
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
		CreateWindow(L"BUTTON", L"��������/�������� ��������� ���������", WS_VISIBLE | WS_CHILD
			| WS_BORDER, 20, 20, 300, 20, hWndinp, (HMENU)2, NULL, NULL);
		CreateWindow(L"BUTTON", L"�������", WS_VISIBLE | WS_CHILD
			| WS_BORDER, 20, 50, 90, 20, hWndinp, (HMENU)1, NULL, NULL);

		break;
	}
	case WM_COMMAND:
	{
		switch (LOWORD(wParam))
		{
			// ��������� ������ (������� ������, ����, ����� ����� � �.�.)
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