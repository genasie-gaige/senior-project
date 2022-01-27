//
//  barcodeScanner.swift
//  shelf
//
//  Created by Quin’darius Lyles-Woods on January/26/2022.
//

import SwiftUI

struct barcodeScanner: View {
    var image: CGImage?
    private let label = Text("Camera Feed")
    var body: some View {
        if let image = image {
            GeometryReader { geometery in
                //
                Image(image,
                      scale: 1.0,
                      orientation: .upMirrored,
                      label: label
                )
                    .resizable()
                    .scaledToFill()
                    .frame(
                        width: geometery.size.width,
                        height: geometery.size.height,
                        alignment: .center
                    )
                    .clipped()
            }
        }
            else {
                Color.black
            }
        }
    }

struct barcodeScanner_Previews: PreviewProvider {
    static var previews: some View {
        barcodeScanner()
    }
}
