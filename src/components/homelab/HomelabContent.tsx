'use client';

import React, { useState, useEffect } from 'react';
import { Locale, getDictionary } from '@/lib/dictionaries';
import { Server, Monitor, Wifi, Box, Image, Mail, GitBranch, Database, CloudCog, Code } from 'lucide-react';
import HomelabGallery from '@/components/homelab/HomelabGallery';

// Pre-load dictionaries to avoid waiting in client components
const dictionaryCache: Record<string, any> = {};// eslint-disable-line @typescript-eslint/no-explicit-any

const HomelabContent = ({ 
  lang, 
  dictionary: propDictionary 
}: { 
  lang: Locale, 
  dictionary?: any // eslint-disable-line @typescript-eslint/no-explicit-any
}) => {
  // State for loading the dictionary if not provided as prop
  const [dictionary, setDictionary] = useState<any | null>(propDictionary || null);// eslint-disable-line @typescript-eslint/no-explicit-any
  const [isLoading, setIsLoading] = useState(!propDictionary);

  // Load the dictionary if not provided as prop
  useEffect(() => {
    if (propDictionary) {
      setDictionary(propDictionary);
      return;
    }

    async function loadDictionary() {
      if (dictionaryCache[lang]) {
        setDictionary(dictionaryCache[lang]);
        setIsLoading(false);
        return;
      }

      try {
        const dict = await getDictionary(lang);
        dictionaryCache[lang] = dict;
        setDictionary(dict);
      } catch (error) {
        console.error('Failed to load dictionary:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadDictionary();
  }, [lang, propDictionary]);

  // Default texts if dictionary is not loaded yet or doesn't have the translations
  const getText = (key: string, defaultText: string) => {
    if (!dictionary || !dictionary.homelab) return defaultText;
    return dictionary.homelab[key] || defaultText;
  };

  const homelabOverview = {
    title: getText('title', "My Homelab Setup"),
    description: getText('description', "A personal playground for technology exploration, self-hosting, and continuous learning"),
    introduction: [
      getText('intro1', "While cloud services offer convenience and reliability, I maintain a personal homelab environment to experiment with technologies, host my own services, and maintain complete control over my data. This project combines my passion for technology with practical learning in a way that commercial environments often can't accommodate."),
      getText('intro2', "My homelab has evolved over time from a single server to a multi-node high-availability cluster supporting various personal and professional services. It's a continuous learning experience that complements my professional software development work with hands-on infrastructure knowledge.")
    ]
  };

  const homelabComponents = [
    {
      name: getText('proxmoxCluster', "Proxmox Cluster"),
      description: getText('proxmoxDesc', "Three-node high-availability Proxmox VE cluster for seamless service migration and maximum uptime"),
      icon: <Server className="h-6 w-6 text-indigo-600" />,
      details: [
        getText('proxmoxDetail1', "Three custom-built server nodes with Intel processors and storage redundancy"),
        getText('proxmoxDetail2', "Primary 'lily' node with 32-core i9-13900K, 32GB RAM, 1TB SSD for VMs and 250GB SSD for OS"),
        getText('proxmoxDetail3', "Secondary 'zara1' node with 12-core Xeon E-2236, 32GB ECC RAM, 1TB SSD for VMs, 120GB OS SSD, and 2x 1TB HDDs in ZFS mirror for backup"),
        getText('proxmoxDetail4', "Tertiary 'zara2' node with 4-core Intel Pentium Gold, 8GB RAM, 1TB SSD, and 2x 1TB HDDs in ZFS mirror for backup replication"),
        getText('proxmoxDetail5', "Live migration capabilities for zero-downtime maintenance")
      ]
    },
    {
      name: getText('virtualizedDesktop', "Virtualized Desktop"),
      description: getText('virtualizedDesktopDesc', "Full desktop virtualization with GPU and USB passthrough for near-bare-metal performance"),
      icon: <Monitor className="h-6 w-6 text-indigo-600" />,
      details: [
        getText('virtualizedDesktopDetail1', "Windows VM with dedicated GPU passthrough for graphics-intensive applications"),
        getText('virtualizedDesktopDetail2', "Complete USB device passthrough for peripherals"),
        getText('virtualizedDesktopDetail3', "VM snapshot capabilities for system backup and rapid restoration"),
        getText('virtualizedDesktopDetail4', "Seamless performance nearly indistinguishable from bare metal"),
        getText('virtualizedDesktopDetail5', "Easy migration between physical hosts for maintenance flexibility")
      ]
    },
    {
      name: getText('network', "Network Infrastructure"),
      description: getText('networkDesc', "Virtualized networking with OPNsense providing advanced routing and security features"),
      icon: <Wifi className="h-6 w-6 text-indigo-600" />,
      details: [
        getText('networkDetail1', "Virtualized OPNsense router with full network isolation"),
        getText('networkDetail2', "VLAN segmentation for security separation between services"),
        getText('networkDetail3', "Internal DNS server for local service discovery"),
        getText('networkDetail4', "Traffic monitoring and quality of service (QoS) implementation"),
        getText('networkDetail5', "VPN server for secure remote access to home network")
      ]
    },
    {
      name: getText('backup', "Backup System"),
      description: getText('backupDesc', "Multi-layered backup strategy with local and cloud redundancy"),
      icon: <Database className="h-6 w-6 text-indigo-600" />,
      details: [
        getText('backupDetail1', "Local ZFS mirrored drives on both backup nodes for data redundancy"),
        getText('backupDetail2', "Cross-node replication for protection against node failures"),
        getText('backupDetail3', "Proxmox Backup Server for VM and container backups"),
        getText('backupDetail4', "Hourly offsite backups to Blackblaze cloud storage"),
        getText('backupDetail5', "Custom backup scripts for database dumps and configuration files")
      ]
    }
  ];

  const selfHostedServices = [
    {
      name: getText('emailServer', "Email Server (Mailcow)"),
      icon: <Mail className="h-5 w-5 text-indigo-600" />,
      description: getText('emailServerDesc', "Complete email solution with spam filtering, DKIM, SPF, DMARC, and web interface")
    },
    {
      name: getText('photoManagement', "Photo Management (Immich)"),
      icon: <Image className="h-5 w-5 text-indigo-600" />,
      description: getText('photoManagementDesc', "Self-hosted Google Photos alternative for personal media collections with AI features")
    },
    {
      name: getText('gitServer', "Git Server (Gitea)"),
      icon: <GitBranch className="h-5 w-5 text-indigo-600" />,
      description: getText('gitServerDesc', "Lightweight Git server for personal and professional project version control")
    },
    {
      name: getText('fileSharing', "File Sharing (Samba)"),
      icon: <CloudCog className="h-5 w-5 text-indigo-600" />,
      description: getText('fileSharingDesc', "Personal cloud storage and file sharing solution accessible across all devices")
    },
    {
      name: getText('documentation', "Documentation (Bookstack)"),
      icon: <Code className="h-5 w-5 text-indigo-600" />,
      description: getText('documentationDesc', "Knowledge base for technical documentation and guides")
    },
    {
      name: getText('devEnvironments', "Development Environments"),
      icon: <Box className="h-5 w-5 text-indigo-600" />,
      description: getText('devEnvironmentsDesc', "Isolated development and testing environments for software projects")
    }
  ];

  const learningOutcomes = [
    getText('learningOutcome1', "Deep understanding of virtualization technologies and their limitations"),
    getText('learningOutcome2', "Practical experience with high-availability configurations and failover mechanisms"),
    getText('learningOutcome3', "Advanced networking knowledge including VLANs, routing, and traffic management"),
    getText('learningOutcome4', "System administration skills applicable to both personal and enterprise environments"),
    getText('learningOutcome5', "Hardware selection and optimization for specific workloads"),
    getText('learningOutcome6', "Troubleshooting complex interconnected systems"),
    getText('learningOutcome7', "Data management, backup strategies, and disaster recovery planning")
  ];

  // If still loading, show a loading state
  if (isLoading) {
    return (
      <div className="bg-white">
        <div className="bg-indigo-700 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <div className="h-5 w-32 bg-indigo-600 rounded mx-auto animate-pulse"></div>
              <div className="mt-2 h-8 w-96 bg-indigo-800 rounded mx-auto animate-pulse"></div>
              <div className="mt-6 h-4 w-full bg-indigo-800 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="bg-indigo-700 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-200">{getText('personalProject', "Personal Project")}</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {homelabOverview.title}
            </p>
            <p className="mt-6 text-lg leading-8 text-indigo-100">
              {homelabOverview.description}
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-lg prose-indigo mx-auto text-gray-700">
            {homelabOverview.introduction.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Infrastructure Components - MOVED BEFORE GALLERY */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">{getText('infrastructure', "Infrastructure")}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {getText('coreComponents', "Core Components")}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {getText('infrastructureDescription', "My homelab is built on a foundation of reliable hardware, virtualization, and networking technologies that work together to create a flexible, powerful environment.")}
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-2">
              {homelabComponents.map((component, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md border border-gray-100 h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                        {component.icon}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{component.name}</h3>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{component.description}</p>
                  <ul className="space-y-2 mt-4">
                    {component.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Screenshot Gallery Section - NOW AFTER CORE COMPONENTS */}
      <HomelabGallery lang={lang} />

      {/* Self-Hosted Services */}
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">{getText('applications', "Applications")}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {getText('selfHostedServices', "Self-Hosted Services")}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {getText('selfHostedServicesDescription', "The infrastructure supports a variety of services that provide alternatives to cloud-based options, giving me complete control over my data and configurations.")}
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {selfHostedServices.map((service) => (
                <div key={service.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      {service.icon}
                    </div>
                    {service.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{service.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Why I Do This */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">{getText('motivation', "Motivation")}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {getText('whyMaintainHomelab', "Why I Maintain a Homelab")}
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="prose prose-indigo max-w-none">
                <p>
                  {getText('motivationParagraph1', "Maintaining this homelab setup isn't about necessity or cost efficiency—it's about passion for technology and continuous learning. The process of researching components, building servers, configuring virtualization, and implementing services provides hands-on experience that complements my professional work.")}
                </p>
                <p>
                  {getText('motivationParagraph2', "While it would be easier to use cloud services, I value the complete control over my data and the deep understanding of infrastructure that comes from building everything myself. It's a technical playground where I can experiment with new technologies, configurations, and setups in ways that wouldn't be possible in a production environment.")}
                </p>
                <p>
                  {getText('motivationParagraph3', "This project has enhanced my understanding of system architecture and infrastructure in ways that directly translate to my work as a software developer. Having intimate knowledge of how the underlying systems work helps me build more efficient, reliable software.")}
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{getText('skillsDeveloped', "Skills Developed:")}</h3>
                <ul className="space-y-2 mt-4">
                  {learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomelabContent;