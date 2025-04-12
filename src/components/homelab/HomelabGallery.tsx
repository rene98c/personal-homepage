'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

// Define TypeScript interfaces for our data structures
interface HardwareSpec {
  node: string;
  cpu: string;
  ram: string;
  storage: string;
  role: string;
}

interface ScreenshotImage {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  description: string;
}

const HomelabGallery = () => {
  const [currentImage, setCurrentImage] = useState<ScreenshotImage | null>(null);

  const hardwareSpecs: HardwareSpec[] = [
    {
      node: "lily",
      cpu: "32-core 13th Gen Intel i9-13900K @ 3.0GHz",
      ram: "32GB DDR4",
      storage: "1TB SSD for VMs + 250GB SSD for OS + ZFS storage pool",
      role: "Primary compute node, hosts high-performance VMs and containers"
    },
    {
      node: "zara1",
      cpu: "12-core Intel Xeon E-2236 @ 3.4GHz",
      ram: "32GB ECC DDR4",
      storage: "1TB SSD for VMs + 120GB SSD for OS + 2x 1TB HDDs in ZFS mirror for main backup",
      role: "Secondary compute node and primary backup server"
    },
    {
      node: "zara2",
      cpu: "4-core Intel Pentium Gold G5600F @ 3.9GHz",
      ram: "8GB DDR4",
      storage: "1TB SSD for VMs + 120GB SSD for OS + 2x 1TB HDDs in ZFS mirror for backing up main Proxmox backup server",
      role: "Tertiary node and secondary backup server"
    }
  ];

  const screenshots: ScreenshotImage[] = [
    {
      id: 1,
      src: "/images/homelab/proxmox-dashboard.jpg",
      alt: "Proxmox VE Dashboard - VM and Container Overview",
      width: 1200,
      height: 800,
      description: "Main Proxmox Virtual Environment dashboard showing the three-node cluster with all virtual machines and containers. The cluster includes a variety of LXC containers (for lightweight services) and full VMs for more demanding applications."
    },
    {
      id: 2,
      src: "/images/homelab/backup-script.jpg",
      alt: "Custom Backup Script Execution",
      width: 1200,
      height: 800,
      description: "A custom backup script running on the Blackblaze agent container. This script performs hourly offline backups of important data to Blackblaze cloud storage, securing critical information offsite. The script backs up various services including Mailcow (email), Immich (photos), Gitea (git), Bookstack (documentation), and Samba (file sharing)."
    },
    {
      id: 3,
      src: "/images/homelab/lily-node-stats.jpg",
      alt: "Primary Node 'lily' Resource Utilization",
      width: 1200,
      height: 800,
      description: "Resource utilization on the primary 'lily' node with an Intel i9-13900K processor. This node handles the most demanding workloads with 32 CPU cores and 32GB of RAM, showing efficient resource allocation with the current load."
    },
    {
      id: 4,
      src: "/images/homelab/zara1-node-stats.jpg",
      alt: "Secondary Node 'zara1' Resource Utilization",
      width: 1200,
      height: 800,
      description: "Resource monitoring for the 'zara1' node powered by a Xeon E-2236 CPU. This node serves as both a compute server and the primary backup server with its ZFS mirrored drives, and has been running for over 31 days without interruption, demonstrating the stability of the setup."
    },
    {
      id: 5,
      src: "/images/homelab/zara2-node-stats.jpg",
      alt: "Tertiary Node 'zara2' Resource Utilization",
      width: 1200,
      height: 800,
      description: "Resource monitoring for the 'zara2' node, which serves as additional compute capacity and a secondary backup system for the cluster. Its ZFS mirror ensures that backup data is redundantly stored, providing another layer of data protection."
    },
    {
      id: 6,
      src: "/images/homelab/backup-server.jpg",
      alt: "Proxmox Backup Server Interface",
      width: 1200,
      height: 800,
      description: "Proxmox Backup Server interface showing the synchronization jobs between nodes. This ensures data is replicated across multiple physical machines for redundancy and disaster recovery, with additional offsite backups to Blackblaze cloud."
    }
  ];

  const openImage = (image: ScreenshotImage) => {
    setCurrentImage(image);
  };

  const closeImage = () => {
    setCurrentImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!currentImage) return;
    
    const currentIndex = screenshots.findIndex(img => img.id === currentImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % screenshots.length;
    } else {
      newIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
    }
    
    setCurrentImage(screenshots[newIndex]);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Homelab Hardware & Screenshots</h2>
          <p className="mt-4 text-lg text-gray-500">
            Visual tour of my three-node Proxmox cluster and self-hosted services
          </p>
        </div>

        {/* Hardware specifications */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {hardwareSpecs.map((node) => (
            <div 
              key={node.node} 
              className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Node: {node.node}</h3>
                <div className="mt-3 text-sm text-gray-500">
                  <p className="mt-1 flex items-center">
                    <span className="font-medium text-gray-700 mr-2">CPU:</span> 
                    {node.cpu}
                  </p>
                  <p className="mt-1 flex items-center">
                    <span className="font-medium text-gray-700 mr-2">RAM:</span> 
                    {node.ram}
                  </p>
                  <p className="mt-1 flex items-center">
                    <span className="font-medium text-gray-700 mr-2">Storage:</span> 
                    {node.storage}
                  </p>
                  <p className="mt-3 text-gray-700">
                    <span className="font-medium">Role:</span><br />
                    {node.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Screenshots Gallery */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Infrastructure Screenshots
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {screenshots.map((image) => (
              <div 
                key={image.id} 
                className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer relative group"
                onClick={() => openImage(image)}
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{image.alt}</h4>
                </div>
                <div className="absolute inset-0 bg-transparent hover:bg-indigo-600 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                  <span className="sr-only">View details</span>
                  <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {currentImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
            <button 
              className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 focus:outline-none" 
              onClick={closeImage}
            >
              <X className="w-6 h-6" />
              <span className="sr-only">Close</span>
            </button>
            
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-white hover:text-gray-300 focus:outline-none"
              onClick={() => navigateImage('prev')}
            >
              <ChevronLeft className="w-8 h-8" />
              <span className="sr-only">Previous</span>
            </button>
            
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-white hover:text-gray-300 focus:outline-none"
              onClick={() => navigateImage('next')}
            >
              <ChevronRight className="w-8 h-8" />
              <span className="sr-only">Next</span>
            </button>
            
            <div className="max-w-5xl max-h-full flex flex-col">
              <div className="relative">
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  width={1200}
                  height={800}
                  className="max-h-[75vh] object-contain"
                />
              </div>
              <div className="bg-white p-4 mt-2 rounded">
                <h4 className="text-lg font-medium text-gray-900">{currentImage.alt}</h4>
                <p className="mt-2 text-gray-600">{currentImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomelabGallery;