//
//  cameraManager.swift
//  shelf
//
//  Created by Quin’darius Lyles-Woods on January/26/2022.
//

import AVFoundation

class CameraManger: ObservableObject {
    let session = AVCaptureSession()
    enum Status {
        case unconfigured
        case configured
        case unauthorized
        case failed
    }
    
    static let shared = CameraManger()
    private init() {
        configure()
    }
    private func configure(){
        
    }
    func checkPermissions(){
        switch AVCaptureDevice.authorizationStatus(for: .video){
        case .authorized:
            print("authorized")
        case .notDetermined:
            AVCaptureDevice.requestAccess(for: .video){ granted in
                if granted {
                    print("authorized")
                }
            }
        case .denied:
            print("Denied")
        case .restricted:
            print("Restricted")
        @unknown default:
            fatalError()
        }
    }
}
