//
//  ContentView.swift
//  shelf
//
//  Created by Quin’darius Lyles-Woods on January/26/2022.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationView{
            NavigationLink(destination: barcodeScanner()) {
                Text("Barcode Scanner")
                    .navigationTitle("Home")
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
