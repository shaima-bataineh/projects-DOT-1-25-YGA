import Link from "next/link";
import Image from "next/image";

export default function Features() {
  const services = [ 
    { 
     id: 1,
     title: "CRM Management",
     desc: "Organize all your client data in one place and manage contacts, notes, and interactions easily. Track customer history, improve team collaboration, and build stronger long-term relationships with your clients.",
     image: "/crmmanegment.svg",
     link: "/services/crm-management",
    }, 
      
    {
      id: 2,
      title: "Sales Analytics",
      desc: "Get detailed reports and visual charts to monitor your sales performance in real time. Analyze trends, identify opportunities, and make data-driven decisions that help grow your revenue faster.",
      image: "/salesanalytics.svg",
      link: "/services/sales-analytics",
    },
      {
       id: 3,
       title: "Marketing Automation",
       desc: "Automate your marketing workflows by scheduling campaigns, emails, and follow-ups effortlessly. Save time, stay consistent with your audience, and increase engagement using smart automated tools.",
       image: "/emailmarketing.svg",
       link: "/services/marketing-automation",
      },
       { 
        id: 4,
       title: "Lead Tracking",
       desc: "Track potential customers from the first interaction until closing the deal. Stay organized with reminders, follow-ups, and clear lead statuses to never miss a business opportunity.",
       image: "/LeadTracking.svg",
       link: "/services/lead-tracking", 
      },
       
      ]
  return (
    <div className="features-section">

      <div className="features-header">
        <h2>SalesFlow CRM Services</h2>
        <p>
       Powerful tools to manage leads, automate workflows, 
       analyze sales performance, and build long-term customer relationships. 
       Designed to simplify your daily sales tasks, increase team productivity, and turn insights into real business growth.</p>
      </div>

      {services.map((service, index) => (
        <div
          key={service.id}
          className={`feature-row ${index % 2 === 0 ? "row-left" : "row-right"}`}
        >
          <div className="feature-image">
            <Image
              src={service.image}
              alt={service.title}
              width={400}
              height={260}
              className="feature-img"
            />
          </div>

          <div className="feature-text">
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <Link href={service.link} className="learn-btn">
              Learn More
            </Link>
          </div>
        </div>
      ))}

    </div>
  );
}
