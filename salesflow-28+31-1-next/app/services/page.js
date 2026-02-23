"use client";

import ProtectedPage from "@/components/protectedpage";

import './service.css';
import { useState, useEffect } from "react";
import Image from "next/image";
export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ title: "", desc: "", icon: "", link: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
  fetch("/api/services")
    .then(res => res.json())
    .then(data => setServices(Array.isArray(data) ? data : data.services || []));
}, []);


  async function handleSubmit(e) {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { ...formData, id: editingId } : formData;

    const res = await fetch("/api/services", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const updated = await res.json();
      setEditingId(null);
      setFormData({ title: "", desc: "", icon: "", link: "" });

      // تحديث الخدمات بعد أي عملية
      const servicesRes = await fetch("/api/services");
      const servicesData = await servicesRes.json();
      setServices(servicesData);
    }
  }

  function handleEdit(service) {
    setEditingId(service._id);
    setFormData({
      title: service.title,
      desc: service.desc,
      icon: service.icon,
      link: service.link,
    });
  }

  async function handleDelete(id) {
    const res = await fetch("/api/services", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setServices(services.filter(s => s._id !== id));
    }
  }

  return (
    <ProtectedPage>
    <div style={{ padding: "20px" }}>
      <h1>Services</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
        <input placeholder="Description" value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} required />
        <input placeholder="Icon path" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
        <input placeholder="Link" value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      <ul>
  {(Array.isArray(services) ? services : []).map(service => (
    <li key={service._id}>
      {service.icon && (
        <Image
          src={service.icon || "/icons/thumbs/default.png"}
          alt={service.title}
          width={50}
          height={50}
        />
      )}
      <h3>{service.title}</h3>
      <p>{service.desc}</p>
      <p>Link: {service.link}</p>
      <button onClick={() => handleEdit(service)}>Edit</button>
      <button onClick={() => handleDelete(service._id)}>Delete</button>
    </li>
  ))}
</ul>
    </div>
    </ProtectedPage>
  );
}
