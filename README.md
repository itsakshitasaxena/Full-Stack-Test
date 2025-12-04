# Full-Stack-Test
Group 15.Wholesale / Bulk Order Management 
System  
1. Background  
Unlike standard e-commerce (B2C) where customers buy single items, B2B transactions 
involve retailers buying bulk quantities from manufacturers or distributors. This process is 
currently plagued by manual phone orders, messy PDF catalogs, opaque pricing 
negotiation, and complex payment terms (credit), leading to order errors and inventory 
delays.  
2. Challenge  
Develop a B2B-focused commerce platform tailored for bulk purchasing. The system must 
handle unique wholesale constraints such as Minimum Order Quantities (MOQ), tiered 
pricing (e.g., "Buy 100, save 10%"), credit limits, and simplified re-ordering for recurring 
buyers.  
3. User Roles & Flow  
Retailer (Buyer)  
● Registration: Signs up with business details (GST/Tax ID) for verification.  
● Catalog Browsing: Views products with wholesale pricing (often hidden from the 
public).  
● Bulk Ordering: Adds items to cart, respecting MOQs (e.g., "Minimum 12 units 
required").  
● Request for Quote (RFQ): Requests a special price for extremely large orders.  
● Checkout: Chooses payment terms (e.g., "Credit / Net 30" or "Pay Now").  
● Re-order: Uses a "Quick Order" feature to repeat the previous month's inventory 
order.  
Wholesaler (Admin/Seller)  
● Account Approval: Verifies and approves new retailer accounts before they can see 
prices.  
● Pricing Engine: Sets tiered pricing rules (e.g., Price A for 1-50 units, Price B for 51+ 
units).  
● Inventory: Manages stock levels across large volumes.  
● Order Processing: Reviews orders, generates invoices, and updates shipping 
status.  
● Credit Management: Sets credit limits for specific retailers (e.g., "Max credit 
$5000").  
4. Core Requirements  
Functional  
● Tiered Pricing Logic: The system must automatically calculate the unit price based 
on the quantity in the cart.  
● MOQ Enforcement: Prevent users from checking out if they haven't met the 
minimum quantity for a specific SKU.  
● Invoice Generation: Automated PDF invoice creation including tax breakdowns and 
shipping details.  
● Credit System: Ability to buy on credit, track "Amount Due," and block orders if the 
credit limit is exceeded.  
● Bulk Upload: Allow retailers to upload a CSV file of SKUs to fill the cart instantly 
(instead of clicking one by one).  
Non-Functional  
● Data Density: The UI should be designed for efficiency (tables/grids) rather than just 
aesthetics (big images), as buyers order hundreds of items.  
● Precision: Financial calculations must be exact, handling taxes and volume 
discounts correctly.  
● Performance: Fast loading of large catalogs.  
5. Technical Hints (Teams may choose their own stack)  
● Frontend: React or Angular (excellent for handling complex data tables and grids).  
● Backend: Java (Spring Boot), C# (.NET), or Node.js.  
● Database: PostgreSQL or MySQL (Relational integrity is critical for complex pricing 
and orders).  
● PDF Library: Puppeteer or jsPDF for generating invoices.  
● State Management: Redux or Context API to handle complex cart logic with tiered 
pricing.  
6. Hackathon Deliverables  
● Working Prototype demonstrating:  
○ B2B Flow: Register → Admin Approve → Buyer Log in.  
○ Pricing Engine: Show the price changing dynamically as quantity increases in 
the cart.  
○ Checkout: Completion of an order using "Credit" and generation of an invoice.  
● Database Schema: ER Diagram showing relationships between Users, Tiers, 
Products, and Orders.  
● Quick Order Demo: Upload a CSV or click "Reorder" to fill a cart instantly.  
7. Judging Criteria  
Category  
Weight  
B2B Logic (Handling Tiers, MOQs, Credit)  
30%  
Workflow Efficiency (Ease of ordering 100+ items)  
20%  
Document Automation (Invoice quality)  
15%  
User Management (KYC/Approval flows)  
15%  
UI/UX (Professional, data-rich interface)  
20%  
8. Outcome  
A powerful digital supply chain tool that replaces manual bookkeeping with automation, 
allowing wholesalers to scale their operations and retailers to restock inventory with speed 
and accuracy. 
