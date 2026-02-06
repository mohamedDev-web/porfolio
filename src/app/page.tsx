'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Mail, Github, Linkedin, MapPin, ExternalLink, Calendar, Sun, Moon, Download, Send, Briefcase, GraduationCap, Code2, Palette, Zap, Star, ArrowRight, ChevronDown, Menu, X } from 'lucide-react'

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode === 'true') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }

    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href')!)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        setMobileMenuOpen(false)
      })
    })

    // Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', newMode.toString())
    document.documentElement.classList.toggle('dark')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setSubmitMessage('Message sent successfully!')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitMessage('Failed to send message. Please try again.')
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitMessage(''), 5000)
    }
  }

  const skills = [
    { name: 'JavaScript', icon: Code2, level: 90 },
    { name: 'TypeScript', icon: Code2, level: 85 },
    { name: 'React', icon: Zap, level: 88 },
    { name: 'Next.js', icon: Zap, level: 85 },
    { name: 'Node.js', icon: Code2, level: 80 },
    { name: 'UI/UX', icon: Palette, level: 75 },
    { name: 'Python', icon: Code2, level: 70 },
    { name: 'Tailwind CSS', icon: Palette, level: 92 }
  ]

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Revolutionary shopping experience with AI recommendations and real-time inventory management.',
      tech: ['React', 'Node.js', 'MongoDB', 'AI/ML'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative workspace with real-time updates, video calls, and advanced project analytics.',
      tech: ['Next.js', 'TypeScript', 'WebRTC', 'Prisma'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Beautiful weather visualization with interactive maps, forecasts, and climate insights.',
      tech: ['React', 'D3.js', 'API Integration', 'Canvas'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 4,
      title: 'Social Media Analytics',
      description: 'Comprehensive analytics platform for social media performance and engagement tracking.',
      tech: ['Next.js', 'Python', 'PostgreSQL', 'Charts'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false,
      color: 'from-orange-500 to-red-500'
    }
  ]

  const experiences = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovation Inc.',
      description: 'Led a team of 5 developers, architecting scalable solutions for enterprise clients. Increased system performance by 40%.',
      startDate: '2022-01',
      endDate: null,
      type: 'work',
      achievements: ['System Architecture', 'Team Leadership', 'Performance Optimization']
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Digital Solutions Ltd.',
      description: 'Developed 15+ client projects, implemented CI/CD pipelines, and mentored junior developers.',
      startDate: '2020-06',
      endDate: '2021-12',
      type: 'work',
      achievements: ['Full-Stack Development', 'DevOps', 'Mentoring']
    },
    {
      id: 3,
      title: 'Bachelor of Computer Science',
      institution: 'University of Technology',
      description: 'Graduated Magna Cum Laude. Specialized in AI/ML and Distributed Systems. Dean\'s List all semesters.',
      startDate: '2016-09',
      endDate: '2020-05',
      type: 'education',
      achievements: ['GPA: 3.8/4.0', 'Research Assistant', 'Hackathon Winner']
    }
  ]

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-foreground transition-colors duration-300">
        
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl z-50 border-b border-slate-200 dark:border-slate-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JD</span>
                </div>
                <span className="font-bold text-lg">Portfolio</span>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`font-medium transition-colors hover:text-blue-500 ${
                      activeSection === item.href.slice(1) ? 'text-blue-500' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
                <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center gap-2 md:hidden">
                <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700 mt-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`block py-2 font-medium transition-colors hover:text-blue-500 ${
                      activeSection === item.href.slice(1) ? 'text-blue-500' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 text-center max-w-5xl">
            <div className="mb-8 opacity-0 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700 mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium">Available for freelance work</span>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 opacity-0 animate-fade-in-up animation-delay-200">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                John Doe
              </span>
            </h1>
            
            <div className="text-2xl md:text-4xl font-semibold text-slate-600 dark:text-slate-300 mb-8 opacity-0 animate-fade-in-up animation-delay-400">
              Full Stack Developer & UI/UX Designer
            </div>
            
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up animation-delay-600">
              Crafting exceptional digital experiences with cutting-edge technology. 
              Specialized in building scalable web applications that combine beautiful design with powerful functionality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 opacity-0 animate-fade-in-up animation-delay-800">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Download className="h-5 w-5 mr-2" />
                Download Resume
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-slate-300 dark:border-slate-600 px-8 py-3 text-lg rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105" asChild>
                <a href="#contact">
                  <Mail className="h-5 w-5 mr-2" />
                  Let's Connect
                </a>
              </Button>
            </div>
            
            <div className="flex gap-4 justify-center opacity-0 animate-fade-in-up animation-delay-1000">
              {[
                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:john.doe@example.com', label: 'Email' }
              ].map((social) => (
                <Button key={social.label} variant="ghost" size="icon" className="rounded-full w-12 h-12 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-110" asChild>
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in-up animation-delay-1200">
              <ChevronDown className="h-6 w-6 text-slate-400 animate-bounce" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-4 opacity-0 translate-y-10 transition-all duration-1000 ease-out">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300">Passionate developer with a love for clean code</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    Hey! I'm <span className="font-semibold text-blue-500">John Doe</span>, a passionate Full Stack Developer with 
                    <span className="font-semibold text-purple-500"> 5+ years</span> of experience building digital products that make a difference.
                  </p>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    My journey in tech started with a curiosity about how things work on the internet, and evolved into a career focused on creating 
                    <span className="font-semibold text-pink-500"> scalable, user-centric applications</span> that solve real-world problems.
                  </p>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through 
                    technical writing and mentoring aspiring developers.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Mail, text: 'john.doe@example.com', label: 'Email' },
                    { icon: MapPin, text: 'San Francisco, CA', label: 'Location' },
                    { icon: Github, text: 'github.com/johndoe', label: 'GitHub' },
                    { icon: Linkedin, text: 'linkedin.com/in/johndoe', label: 'LinkedIn' }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <item.icon className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
                        <p className="text-sm font-medium">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Zap className="h-6 w-6 text-yellow-500" />
                    Technical Skills
                  </h3>
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <div key={skill.name} className="opacity-0 translate-x-[-20px] transition-all duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <skill.icon className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">{skill.name}</span>
                          </div>
                          <span className="text-sm text-slate-500 dark:text-slate-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { number: '50+', label: 'Projects Completed' },
                    { number: '5+', label: 'Years Experience' },
                    { number: '30+', label: 'Happy Clients' },
                    { number: '15+', label: 'Technologies' }
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {stat.number}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-4 bg-slate-50 dark:bg-slate-900/50 opacity-0 translate-y-10 transition-all duration-1000 ease-out">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300">Showcasing my best work and creative solutions</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card 
                  key={project.id} 
                  className={`group relative overflow-hidden border-0 bg-white dark:bg-slate-800 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] opacity-0 translate-y-10`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <CardContent className="p-8 relative">
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-500 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex} 
                          variant="secondary"
                          className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:scale-110 transition-transform cursor-default"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild 
                        className="border-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-500 transition-all duration-300"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          View Code
                        </a>
                      </Button>
                      <Button 
                        size="sm" 
                        asChild 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300"
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-4 opacity-0 translate-y-10 transition-all duration-1000 ease-out">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  Experience & Education
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300">My professional journey and academic background</p>
            </div>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div 
                  key={exp.id} 
                  className="relative opacity-0 translate-x-[-20px] transition-all duration-700"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Timeline Line */}
                  {index < experiences.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-24 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                  )}
                  
                  <div className="flex gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                        exp.type === 'work' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                          : 'bg-gradient-to-r from-green-500 to-teal-500'
                      }`}>
                        {exp.type === 'work' ? (
                          <Briefcase className="h-5 w-5" />
                        ) : (
                          <GraduationCap className="h-5 w-5" />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {exp.title}
                          </h3>
                          <p className="text-lg text-blue-500 dark:text-blue-400 font-medium">
                            {exp.company || exp.institution}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(exp.startDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short' 
                            })}
                            {' - '}
                            {exp.endDate 
                              ? new Date(exp.endDate).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short' 
                                })
                              : 'Present'
                            }
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {exp.achievements && (
                        <div className="flex flex-wrap gap-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <Badge 
                              key={achIndex} 
                              variant="outline"
                              className="text-xs bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                            >
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-4 bg-slate-50 dark:bg-slate-900/50 opacity-0 translate-y-10 transition-all duration-1000 ease-out">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Let's Connect
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300">Have a project in mind? Let's create something amazing together</p>
            </div>

            <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 opacity-0 translate-y-4 transition-all duration-500" style={{ animationDelay: '100ms' }}>
                      <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Smith"
                        className="border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    
                    <div className="space-y-2 opacity-0 translate-y-4 transition-all duration-500" style={{ animationDelay: '200ms' }}>
                      <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                        className="border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 opacity-0 translate-y-4 transition-all duration-500" style={{ animationDelay: '300ms' }}>
                    <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell me about your project..."
                      rows={5}
                      className="border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>
                  
                  <div className="opacity-0 translate-y-4 transition-all duration-500" style={{ animationDelay: '400ms' }}>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 text-lg rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Sending Message...'
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </>
                      )}
                    </Button>
                    
                    {submitMessage && (
                      <div className={`mt-4 p-4 rounded-lg text-center ${
                        submitMessage.includes('successfully') 
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800' 
                          : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                      }`}>
                        {submitMessage}
                      </div>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="mt-12 text-center">
              <p className="text-slate-600 dark:text-slate-300 mb-6">Or reach out directly</p>
              <div className="flex justify-center gap-4">
                {[
                  { icon: Mail, text: 'john.doe@example.com', href: 'mailto:john.doe@example.com' },
                  { icon: Github, text: 'github.com/johndoe', href: 'https://github.com' },
                  { icon: Linkedin, text: 'linkedin.com/in/johndoe', href: 'https://linkedin.com' }
                ].map((item) => (
                  <Button key={item.text} variant="outline" asChild className="hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-500 transition-all duration-300">
                    <a href={item.href} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {item.text}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="container mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">JD</span>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Built with passion using Next.js, TypeScript, and Tailwind CSS
            </p>
            <div className="flex justify-center gap-4 mb-6">
              {[
                { icon: Github, href: 'https://github.com' },
                { icon: Linkedin, href: 'https://linkedin.com' },
                { icon: Mail, href: 'mailto:john.doe@example.com' }
              ].map((social) => (
                <Button key={social.href} variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-110" asChild>
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © 2024 John Doe. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}