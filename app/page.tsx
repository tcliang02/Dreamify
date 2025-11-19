'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { initializeData, storage } from '@/lib/storage';
import { ArrowRight, Users, DollarSign, Target, TrendingUp, Sparkles, Zap, Rocket, BookOpen, Calendar, Eye, Heart, Award, CheckCircle2, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const [stats, setStats] = useState({
    totalStartups: 0,
    totalMentors: 0,
    totalFunding: 0,
    totalUsers: 0,
  });
  const [featuredStartups, setFeaturedStartups] = useState<any[]>([]);

  useEffect(() => {
    initializeData();
    
    // Load statistics
    const startups = storage.getStartups();
    const mentors = storage.getMentors();
    const users = storage.getUsers();
    const totalFunding = startups.reduce((sum: number, s: any) => sum + (s.fundingReceived || 0), 0);
    
    setStats({
      totalStartups: startups.length,
      totalMentors: mentors.length,
      totalFunding,
      totalUsers: users.length,
    });

    // Get featured startups (top viewed/liked)
    const featured = startups
      .sort((a: any, b: any) => {
        const aScore = (a.views || 0) + (a.likes || 0) * 2;
        const bScore = (b.views || 0) + (b.likes || 0) * 2;
        return bScore - aScore;
      })
      .slice(0, 3);
    setFeaturedStartups(featured);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white py-24 md:py-32">
        {/* GIF Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/hero-background.gif)',
          }}
        />
        {/* Light overlay for text readability only */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Platform for Young Innovators</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              IDEAS MEET OPPORTUNITY
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto">
              Showcase your prototypes, connect with mentors, and secure funding to turn your ideas into reality
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/startups" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 font-bold text-lg px-8 py-6 glow-cyber border-2 border-cyan-400/40 hover:scale-105">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/programmes" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-cyan-400/50 bg-white/10 backdrop-blur-xl text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400/70 hover:text-cyan-300 glass-futuristic px-8 py-6 text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg">
                  View Programmes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Banner */}
      <section className="py-12 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-30"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">{stats.totalStartups}+</div>
              <div className="text-sm md:text-base text-white/90">Active Startups</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">{stats.totalMentors}+</div>
              <div className="text-sm md:text-base text-white/90">Expert Mentors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">RM {(stats.totalFunding / 1000).toFixed(0)}K+</div>
              <div className="text-sm md:text-base text-white/90">Funding Raised</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">{stats.totalUsers}+</div>
              <div className="text-sm md:text-base text-white/90">Innovators</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Startups Section */}
      {featuredStartups.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 border-blue-200">Success Stories</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-cyber">Featured Startups</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover innovative projects from our community
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredStartups.map((startup) => (
                <Link key={startup.id} href={`/startups/${startup.id}`}>
                  <Card className="hover-lift transition-all h-full">
                    {startup.image && (
                      <div className="relative w-full h-48 overflow-hidden rounded-t-lg bg-muted">
                        <img
                          src={startup.image}
                          alt={startup.title}
                          className="w-full h-full object-cover"
                        />
                        {((startup.views || 0) > 200 && (startup.likes || 0) > 20) && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-orange-500 text-white border-2 border-orange-300">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{startup.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{startup.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span className="font-semibold">{startup.views || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span className="font-semibold">{startup.likes || 0}</span>
                        </div>
                      </div>
                      <Badge variant="outline">{startup.category}</Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 border-blue-200">Why Choose Go Start Hub?</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-cyber">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The complete platform for student innovators in Malaysia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover-lift transition-all group">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg glow-blue">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="gradient-text-blue">Showcase Prototypes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Display your innovative prototypes to potential investors and mentors
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all group">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg glow-blue">
                  <BookOpen className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="gradient-text-blue">Innovation Programmes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Join accelerators, bootcamps, and hackathons to grow your innovation
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all group">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg glow-blue">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="gradient-text-blue">Networking Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Attend workshops, seminars, and networking events to expand your network
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all group">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg glow-blue">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="gradient-text-blue">Expert Mentorship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with industry experts and experienced mentors
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all group">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg glow-blue">
                  <DollarSign className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="gradient-text-blue">Funding Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access funding from businesses and investors across Malaysia
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-all group">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg glow-blue">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="gradient-text-blue">Growth Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get the support you need to scale from idea to startup
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 border-blue-200">Simple Process</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-cyber">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple steps to get started on your innovation journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center hover-lift">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg glow-blue">
                  1
                </div>
                <CardTitle className="gradient-text-blue">Create Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sign up as an innovator and create your profile showcasing your skills and interests
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg glow-blue">
                  2
                </div>
                <CardTitle className="gradient-text-blue">Showcase Your Prototype</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Upload your prototype details, images, and documentation to attract attention
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg glow-blue">
                  3
                </div>
                <CardTitle className="gradient-text-blue">Connect & Grow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with mentors, apply for funding, and grow your innovation into a startup
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories / Testimonials */}
      <section className="py-20 bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 border-blue-200">Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-cyber">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from innovators who turned their ideas into reality
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="hover-lift">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-lg">
                    AS
                  </div>
                  <div>
                    <CardTitle className="text-lg gradient-text-blue">Ahmad Syafiq</CardTitle>
                    <CardDescription>UTM Student</CardDescription>
                  </div>
                </div>
                <Quote className="h-8 w-8 text-blue-400/50 mb-2" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic mb-4">
                  "Go Start Hub helped me connect with the right mentors and secure funding for my IoT project. The platform made it easy to showcase my prototype and get noticed by investors."
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4 text-blue-500" />
                  <span className="font-semibold text-blue-700">RM 50,000 Funding Secured</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-300 flex items-center justify-center text-white font-bold shadow-lg">
                    SL
                  </div>
                  <div>
                    <CardTitle className="text-lg gradient-text-blue">Sarah Lim</CardTitle>
                    <CardDescription>UM Graduate</CardDescription>
                  </div>
                </div>
                <Quote className="h-8 w-8 text-blue-400/50 mb-2" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic mb-4">
                  "The mentorship program on Go Start Hub was invaluable. My mentor guided me through the entire startup journey, from prototype to market launch. Highly recommended!"
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-blue-500" />
                  <span className="font-semibold text-blue-700">Startup Launched</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                    MH
                  </div>
                  <div>
                    <CardTitle className="text-lg gradient-text-blue">Muhammad Hafiz</CardTitle>
                    <CardDescription>UPM Student</CardDescription>
                  </div>
                </div>
                <Quote className="h-8 w-8 text-blue-400/50 mb-2" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic mb-4">
                  "I joined the Go Start Hub Accelerator program and it transformed my idea into a viable business. The workshops, networking events, and funding opportunities were exactly what I needed."
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="font-semibold text-blue-700">Accelerator Graduate</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-purple opacity-30"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <Rocket className="h-16 w-16 mx-auto mb-6 animate-float drop-shadow-lg" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Ready to Start Your Innovation Journey?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join hundreds of young innovators already on Go Start Hub
          </p>
          <Link href="/startups">
            <Button size="lg" className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:from-cyan-300 hover:via-blue-400 hover:to-purple-400 text-white shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 font-bold text-lg px-8 py-6 glow-cyber border-2 border-cyan-300/40 hover:scale-105">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

