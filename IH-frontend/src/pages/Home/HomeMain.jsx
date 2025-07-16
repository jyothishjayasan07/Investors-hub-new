import React from 'react'
import Header from './Header'
import {
  Star,
  ArrowRight,
  Building2,
  TrendingUp,
  Users,
  Calendar,
  CheckCircle,
} from 'lucide-react';

function HomeMain() {
  return (
    <>
    <Header/>
     <div className="space-y-16 pt-8 ">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl p-8 md:p-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 mr-2" />
            Trusted by 500+ Companies & Investors
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Connect with <span className="gradient-text">Investors</span> &<br />
            Grow Your Business
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            InvestorHub brings companies and investors together on a single platform,
            making fundraising and investment opportunities seamless, efficient, and transparent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-hover bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="btn-hover border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: <Building2 className="h-10 w-10 text-blue-600" />,
            title: 'For Companies',
            description: 'Showcase your projects and connect with potential investors worldwide',
          },
          {
            icon: <TrendingUp className="h-10 w-10 text-green-600" />,
            title: 'For Investors',
            description: 'Discover promising investment opportunities and track performance metrics',
          },
          {
            icon: <Users className="h-10 w-10 text-purple-600" />,
            title: 'Network',
            description: 'Build meaningful relationships with industry professionals and experts',
          },
          {
            icon: <Calendar className="h-10 w-10 text-red-600" />,
            title: 'Schedule Meetings',
            description: 'Easily coordinate and schedule investment meetings with built-in tools',
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="card-hover bg-white p-8 rounded-2xl shadow-sm border border-gray-100 group"
          >
            <div className="mb-6 p-3 rounded-xl w-fit bg-opacity-10" style={{ backgroundColor: `${feature.icon.props.className.split('text-')[1]}20` }}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 text-white rounded-3xl p-8 md:p-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Join thousands of successful companies and investors who have found their perfect match
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { number: '500+', label: 'Active Companies' },
            { number: '1,200+', label: 'Registered Investors' },
            { number: '$50M+', label: 'Total Investments' },
            { number: '95%', label: 'Success Rate' },
          ].map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-blue-400">
                {stat.number}
              </div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          Simple steps to connect companies with investors
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Create Your Profile',
              description: 'Companies showcase projects, investors set preferences',
              icon: <Users className="h-8 w-8" />,
            },
            {
              step: '02',
              title: 'Discover & Connect',
              description: 'Smart matching algorithm connects relevant parties',
              icon: <TrendingUp className="h-8 w-8" />,
            },
            {
              step: '03',
              title: 'Meet & Invest',
              description: 'Schedule meetings and complete secure transactions',
              icon: <CheckCircle className="h-8 w-8" />,
            },
          ].map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-blue-50 rounded-2xl p-8 text-center">
                <div className="text-blue-600 font-bold text-sm mb-4">{step.step}</div>
                <div className="bg-blue-600 text-white p-4 rounded-xl w-fit mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-8 md:p-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
          Join InvestorHub today and take the first step towards your next big opportunity
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-hover bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg">
            Start as Company
          </button>
          <button className="btn-hover border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600">
            Start as Investor
          </button>
        </div>
      </section>
    </div>
    </>
  )
}

export default HomeMain