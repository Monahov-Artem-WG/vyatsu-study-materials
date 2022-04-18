package main.gui;

import main.gui.StringPanel;

import javax.swing.*;
import java.awt.*;

public class WorkWithStringGenerator implements Runnable {
    private final JFrame mainFrame = new JFrame("WorkWithString");

    @Override
    public void run() {
        mainFrame.setPreferredSize(new Dimension(500, 250));
        mainFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        JPanel workWithStringPanel = new StringPanel();

        Dimension dimension = Toolkit.getDefaultToolkit().getScreenSize();

        mainFrame.setContentPane(workWithStringPanel);
        mainFrame.pack();
        mainFrame.setVisible(true);
        mainFrame.setResizable(false);
        mainFrame.setLocationRelativeTo(null);
    }
}
