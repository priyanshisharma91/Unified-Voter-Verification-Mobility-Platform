#  Unified Voter Verification & Mobility Platform

A web-based prototype demonstrating a **secure, interoperable voter verification and mobility system** designed for large-scale elections.  
This project focuses on reducing duplicate voter entries, enabling voter mobility across states, and showcasing transparent verification workflows using modern web technologies.

>  This is a **functional prototype** created for hackathon and academic demonstration purposes only.

---

##  Problem Addressed

Election systems face challenges such as:
- Duplicate voter records across multiple states  
- Limited voter mobility  
- Manual and slow verification processes  
- Lack of unified voter data visibility  

This prototype demonstrates how a **technology-driven architecture** can conceptually address these challenges.

##  How the System Works (High-Level Logic)

1. **Voter Registration**
   - User submits personal details
   - Identity uniqueness is simulated using unique identifiers
   - Duplicate registration prevention is demonstrated at UI level

2. **Authentication**
   - Login flow represents voter/admin access
   - Role-based access is visually separated

3. **Unified Voter Record**
   - A single digital voter profile is shown
   - Conceptual access across regions is demonstrated

4. **Admin & Audit Flow**
   - Admin dashboard simulates verification and approvals
   - Transparent data flow is represented via UI states


##  Folder Structure

---

- **`src/`** – Core application source code  
- **`components/`** – Reusable UI building blocks  
- **`pages/`** – Screens representing user workflows  
- **`routes/`** – Handles client-side navigation  
- **`assets/`** – Static resources (icons, images)  
- **`App.tsx`** – Root component  
- **`main.tsx`** – Entry point for React rendering  

---


Component-based architecture improves maintainability and scalability.

##  Technology Stack

- **Frontend:** React (TypeScript)  
- **Styling:** Tailwind CSS  
- **Build Tool:** Vite  
- **Deployment:** GitHub Pages (static hosting)  
- **IDE:** Visual Studio Code (recommended)

##  Installation Guide

### Prerequisites
- Node.js (v18 or later): https://nodejs.org/  
- Visual Studio Code: https://code.visualstudio.com/

### Steps

```bash
# Clone the repository
git clone https://github.com/priyanshisharma91/Unified-Voter-Verification-Mobility-Platform.git

# Navigate into the project directory
cd Unified-Voter-Verification-Mobility-Platform

# Install dependencies
npm install

# Start the development server
npm run dev
----
## **Live Prototype**

**Prototype URL:**  
https://vote-flow-link.lovable.app

