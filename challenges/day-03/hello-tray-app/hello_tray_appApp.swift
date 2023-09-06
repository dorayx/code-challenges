//
//  hello_tray_appApp.swift
//  hello-tray-app
//
//  Created by Doray Hong on 2023/9/6.
//

import SwiftUI

@main
struct hello_tray_appApp: App {
    @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    var body: some Scene {
        Settings {
            EmptyView()
        }
    }
}

class AppDelegate: NSObject, NSApplicationDelegate {

    lazy var statusBarItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.squareLength)
    
    func applicationDidFinishLaunching(_ notification: Notification) {
        let tray = NSImage(named: NSImage.Name("tray"))
        tray?.isTemplate = true
        
        statusBarItem.button?.image = tray
        
        setupMenus()
    }
    
    func setupMenus() {
        let menu = NSMenu()
        
        let one = NSMenuItem(title: "One", action: #selector(didTapOne), keyEquivalent: "1")
        menu.addItem(one)
        
        menu.addItem(NSMenuItem.separator())
        
        let quit = NSMenuItem(title: "Quit", action: #selector(didTapQuit), keyEquivalent: "quit")
        menu.addItem(quit)
        
        statusBarItem.menu = menu
    }

    @objc func didTapOne() {
        NSLog("tap one")
    }
    
    @objc func didTapQuit() {
        NSApplication.shared.terminate(self)
    }
}

