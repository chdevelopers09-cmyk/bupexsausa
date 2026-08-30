**PRODUCT REQUIREMENTS DOCUMENT**

**BUPEXSA USA Website --- Bug Fixes, UX Cleanup & Payment Integration**

Client: BUPEXSA USA (bupexsausa.org)

Prepared for: Website development team

Date: August 19, 2026 · Version: 1.1 · Status: Draft for client review

*Source inputs: client feedback PDF (\"BUP EXSA USA Website
Feedback\") + live audit of bupexsausa.org (Aug 18, 2026)*

# **1. Purpose & Scope**

BUPEXSA USA has a live website with the core content structure already
in place (About, Membership, Chapters, Events, Gallery, Donations,
Contact, Login, Registration, Admin panel). Client feedback identified
that the site is not yet launch-ready: payments are not functionally
connected, the registration/login flow is inconsistent, and the design
needs mobile-first polish.

This PRD translates that feedback plus a direct audit of the live site
into a scoped set of fixes. Per client instruction, this scope is
fix-and-polish only:

-   No rewrite of existing content or copy.

-   No major redesign --- visual identity, purple theme, and page
    > structure stay as-is.

-   Focus: make what already exists actually work (payments,
    > registration, login/account state), plus minimal, targeted UI/UX
    > cleanup (mobile experience, gallery presentation, header state).

This document also flags open questions that need client decisions
before development can start on payments and admin workflow --- see
Section 6.

# **2. Current State (Live Audit Summary)**

A direct check of bupexsausa.org on Aug 18, 2026 confirms and adds
detail to the client feedback:

-   The Donations page already has a built donation form UI with amount
    > presets, a payment-method selector (Card, PayPal, Zelle, CashApp),
    > and a \"Secured by Stripe\" note --- but per client, no method is
    > actually processing payments end-to-end.

-   The Membership page\'s \"Register Now\" call-to-action button is
    > mis-linked: it currently points to /donations instead of
    > /register. This routes prospective members to the wrong page and
    > is an easy, high-value fix.

-   The footer already lists \"Pay Dues\" as a dashboard link
    > (/dashboard/payments), confirming a dues-payment flow is intended
    > inside the member dashboard, separate from the public Donations
    > page.

-   Site is a Next.js application with an existing /admin panel route,
    > confirming a backend/CMS layer already exists --- the question is
    > which parts of it are actually wired up (see Section 6).

These are consistent with the client feedback: the foundation exists,
but several flows are disconnected or incomplete.

# **3. Issues & Required Fixes**

## **3.1 Payments (Donations + Membership Dues)**

This is the top priority --- currently no payment method works
end-to-end.

  ----------------------------------------------------------------------------------
  **Area**       **Issue (Current          **Fix Required**           **Priority**
                 Behavior)**                                          
  -------------- ------------------------- -------------------------- --------------
  Donation form  Card/Stripe, PayPal,      Launch with the methods    **Critical**
                 Zelle, CashApp are all    the client can support     
                 shown as options but none manually today: Zelle and  
                 are functionally          CashApp (bank/P2P,         
                 connected.                admin-verified) and PayPal 
                                           (via PayPal.me or business 
                                           email). Hide or remove     
                                           Card/Stripe until a real   
                                           Stripe account is          
                                           connected and tested (see  
                                           3.1.1).                    

  Membership     \"Pay Dues\" flow exists  Same payment methods as    **Critical**
  dues payment   in the dashboard but is   donations, but tagged as   
                 not clearly connected to  \"Membership Dues\" so     
                 member status.            admin can distinguish dues 
                                           from donations in the      
                                           backend.                   

  Payment        No confirmation step or   After selecting a method   **High**
  confirmation   status shown to the payer and confirming, show:      
                 after \"paying.\"         \"Thank you. Please allow  
                                           24--72 hours for your      
                                           membership/donation status 
                                           to be updated after        
                                           payment confirmation.\"    
                                           Log the submission as      
                                           Pending in the backend.    

  Admin          No visible way for admin  Add a Payments queue in    **High**
  verification   to mark a payment as      /admin listing Pending     
                 received.                 submissions (name, amount, 
                                           method, reference note,    
                                           date) with a one-click     
                                           \"Mark Verified\" action   
                                           that updates               
                                           member/donation status and 
                                           (ideally) emails the       
                                           member.                    
  ----------------------------------------------------------------------------------

**3.1.1 Recommended payment methods for Phase 1**

Per client feedback, one or two clear, working options beat several
broken-looking ones. Recommended Phase 1 setup:

-   Zelle --- recipient: bupexsausa25@gmail.com (already published on
    > the site\'s Contact/footer, so it\'s a recognizable, trusted
    > recipient for members).

-   PayPal --- recipient: bupexsausa25@gmail.com, using a PayPal.me link
    > or \"Pay with PayPal\" button tied to that email. This can go live
    > in a day since it needs no merchant approval.

-   CashApp --- needs a confirmed \$Cashtag from the client (not yet
    > provided --- see open questions).

-   Card payment via Stripe --- move to Phase 2. It requires a verified
    > Stripe business account, bank payout details, and webhook/testing
    > work. Don\'t show it on the live form until it\'s actually
    > connected --- a payment box that silently fails or leads nowhere
    > damages trust.

*A note on bank wire / ACH details: the reference image supplied shows a
Bank of America account and routing number. Publishing a full account +
routing number on a public web page is not recommended --- anyone with
those two numbers can initiate ACH debits or print checks against the
account, which is a real fraud exposure for the association. If BUPEXSA
USA wants a direct bank-transfer option, it\'s safer to: (a) keep Zelle
as the bank-linked option (Zelle transfers use the recipient\'s
email/phone, never exposing the account/routing number), or (b) share
full wire instructions privately/on request (e.g., by email after a
member asks) rather than posting them on the public donations page.
Happy to adjust this if the client confirms they still want wire details
displayed publicly.*

**3.1.2 Payment flow (Phase 1, manual verification)**

1.  Member/donor selects amount and payment method (Zelle, PayPal, or
    > CashApp) on the Donations page or the dashboard \"Pay Dues\" page.

2.  Site displays the payment instructions for that method (email/handle
    > to send to, and a note to include their full name in the memo).

3.  User confirms they\'ve sent payment and submits the form; the site
    > records a Pending entry (name, email, amount, method, purpose:
    > donation or dues, timestamp).

4.  User sees the 24--72 hour confirmation message from 3.1 above; a
    > copy is optionally emailed to them.

5.  Admin reviews the Pending queue in /admin, cross-checks against the
    > actual Zelle/PayPal/CashApp account, and clicks Mark Verified.

6.  On verification: donation is marked Received (and a receipt emailed,
    > since 501(c)(3) donations should get one), or membership status
    > flips from Pending Payment to Active and the renewal date is set.

## **3.2 Registration, Login & Member Status Flow**

  ---------------------------------------------------------------------------------
  **Area**       **Issue (Current          **Fix Required**          **Priority**
                 Behavior)**                                         
  -------------- ------------------------- ------------------------- --------------
  Confirmation   No email confirmation is  Send an automated         **Critical**
  email          sent after registering.   confirmation email on     
                                           successful registration,  
                                           including next steps (how 
                                           to pay initial dues).     

  Member status  Not modeled as distinct   Implement explicit        **Critical**
  flow           states --- dashboard      status: Registered →      
                 shows renewal prompts     Pending Payment → Active  
                 before initial payment is → Renewal Due → Expired.  
                 even made.                Dashboard messaging is    
                                           driven by this status,    
                                           not a generic template.   

  Renewal prompt Dashboard shows a renewal Only show renewal         **High**
                 prompt for members who    messaging when status =   
                 haven\'t completed their  Active and renewal date   
                 first payment.            is approaching/passed.    
                                           Pending Payment members   
                                           instead see \"Complete    
                                           your membership payment\" 
                                           with a link to Pay Dues.  

  Header state   Header still shows Log In Header must reflect auth  **High**
  after login    / Join Now after a member state: logged-out shows   
                 is logged in.             Log In / Join Now;        
                                           logged-in shows Dashboard 
                                           / My Account / Logout.    

  \"Register     On the Membership page,   Point the button to       **Critical
  Now\" mis-link the Register Now button   /register.                (quick win)**
                 links to /donations                                 
                 instead of /register.                               
  ---------------------------------------------------------------------------------

## **3.3 Forms --- Testing & Reliability**

All forms need to be verified end-to-end (submit → stored/sent →
confirmation shown → any email triggered):

-   Registration form

-   Login / password reset

-   Contact form

-   Donation form

-   Membership / dues payment form

-   Event RSVP form

For each: define what a successful submission does (where the data goes,
what confirmation the user sees, what email if any is sent), and test
the failure case (missing fields, invalid email, duplicate
registration).

## **3.4 Design & Mobile Experience**

No major visual redesign --- this is targeted cleanup so the existing
purple theme feels finished rather than assembled, with mobile as the
priority breakpoint since most members will browse on their phones.

  -------------------------------------------------------------------------------
  **Area**    **Issue (Current           **Fix Required**          **Priority**
              Behavior)**                                          
  ----------- -------------------------- ------------------------- --------------
  Overall     Content reads as placed on Pass for consistent       **Medium**
  polish      the page rather than a     spacing, type scale, and  
              designed layout in places  button/card styling using 
              (spacing, alignment,       the existing purple theme 
              consistency).              --- no new visual         
                                         direction, just tightened 
                                         execution.                

  Gallery /   Photos are laid out on the Convert to a              **Medium**
  photos      page without a gallery     mobile-friendly           
              interaction.               lightbox/slider (swipe on 
                                         mobile, arrows on         
                                         desktop) using the        
                                         existing Images/Videos    
                                         tab structure already on  
                                         the Home and Gallery      
                                         pages.                    

  Mobile      Not confirmed how nav,     Dedicated mobile pass on: **High**
  layout QA   forms, and the             header/nav collapse,      
              donation/payment UI behave donation amount buttons,  
              on small screens.          payment method selector,  
                                         dashboard cards, forms.   
  -------------------------------------------------------------------------------

## **3.5 Admin & Backend**

Before ongoing management is workable, the following need to be
confirmed and, where missing, built:

-   Where member records live (database) and that /admin reads/writes to
    > it --- not static content.

-   Outbound email is configured (confirmation, receipt, and
    > status-change emails actually send).

-   Admin can manually update a member\'s status and see/verify pending
    > payments (Section 3.1.1 queue).

-   Content that should stay easily editable by a non-developer
    > (announcements, events, gallery images) is manageable without a
    > code deploy.

-   A named owner is assigned for post-launch content and
    > payment-verification upkeep.

## **3.6 Site-Wide Performance / Speed**

Client reports the site feels slow on any click or action. Two concrete
contributors are already visible from the live audit, plus areas that
need server-side profiling to confirm:

  -----------------------------------------------------------------------------------------
  **Area**              **Issue (Current           **Fix Required**          **Priority**
                        Behavior)**                                          
  --------------------- -------------------------- ------------------------- --------------
  Gallery images        Grid thumbnails on the     Serve properly sized      **Critical**
  oversized             Home and Gallery pages are responsive images         
                        served at 3840px wide      (Next.js Image component  
                        (visible in the image      with correct              
                        URLs, e.g. \"?w=3840\")    sizes/srcset) --- a       
                        even though they render as thumbnail should load a   
                        small grid tiles.          few hundred KB, not a     
                                                   multi-MB 3840px original. 

  Homepage anthem       Two full video files are   Lazy-load videos below    **High**
  videos                embedded directly on the   the fold, use             
                        homepage.                  preload=\"none\" plus a   
                                                   poster image, and confirm 
                                                   they\'re                  
                                                   compressed/served from a  
                                                   CDN rather than the app   
                                                   server.                   

  Client-rendered pages Pages such as Login return Where content doesn\'t    **High**
                        minimal server-rendered    need to be interactive    
                        HTML, with content built   first (forms, static      
                        client-side after JS       sections), prefer server  
                        loads/hydrates.            rendering so the page     
                                                   appears fast before JS    
                                                   finishes loading; measure 
                                                   and reduce JS bundle size 
                                                   for the initial page      
                                                   load.                     

  Server/API/database   Not yet measurable from    Client to grant access to **Critical**
  response time         outside the app (no access hosting dashboard + run a 
                        to hosting/server logs).   Lighthouse/PageSpeed and  
                                                   server-timing audit       
                                                   together with the dev     
                                                   team to confirm whether   
                                                   slowness is network,      
                                                   server compute, database  
                                                   queries, or unoptimized   
                                                   third-party scripts.      

  Caching / CDN         Not confirmed whether      Confirm CDN +             **Medium**
                        static assets (images,     cache-control headers are 
                        video, CSS/JS) are served  in place for static       
                        through a CDN with cache   assets; add if missing.   
                        headers.                                             
  -----------------------------------------------------------------------------------------

*Recommended first step: run a Lighthouse/PageSpeed Insights report
against the live production URL together with server response-time logs,
so fixes are prioritized against actual bottlenecks rather than guesses.
The two items above (oversized images, homepage videos) are safe to fix
immediately regardless of that report.*

## **3.7 Password Reset --- \"auth-callback-failed\" Error**

Confirmed on the live site: clicking the reset-password link from the
reset email lands on
https://www.bupexsausa.org/login?error=auth-callback-failed instead of a
working password-reset form.

  ---------------------------------------------------------------------------------
  **Area**      **Issue (Current Behavior)** **Fix Required**        **Priority**
  ------------- ---------------------------- ----------------------- --------------
  Reset link    Reset email is sent          Debug the auth callback **Critical**
  callback      successfully; clicking its   route: most likely      
                link fails auth callback and causes are (a) a        
                redirects to /login with an  mismatch between the    
                error, so the member can     www and non-www domain  
                never actually set a new     in the allowed          
                password.                    redirect/callback URL   
                                             configured with the     
                                             auth provider, (b) an   
                                             expired or single-use   
                                             token being hit twice   
                                             (e.g., by email         
                                             link-scanners), or (c)  
                                             a misconfigured         
                                             callback route. Verify  
                                             by testing the reset    
                                             flow end-to-end with    
                                             server logs open.       

  Domain        Site is reachable at both    Pick one canonical      **High**
  consistency   bupexsausa.org and           domain, 301-redirect    
                www.bupexsausa.org.          the other to it, and    
                                             make sure the auth      
                                             provider\'s allowed     
                                             callback URLs match the 
                                             canonical domain        
                                             exactly --- a silent    
                                             mismatch here is a      
                                             common cause of this    
                                             exact error.            
  ---------------------------------------------------------------------------------

## **3.8 Alumni Members vs. Website Staff --- Must Be Fully Separated (Most Critical)**

**Per client: Alumni Members and website administration users (Admin,
Superadmin, Content Editor, etc.) are currently showing together in the
same table/page. These are two fundamentally different user types and
must never share a view.**

  ----------------------------------------------------------------------------------------------
  **Area**        **Issue (Current Behavior)** **Fix Required**                   **Priority**
  --------------- ---------------------------- ---------------------------------- --------------
  Admin panel     Alumni members and           Split into two distinct areas in   **Critical**
  user list       staff/admin accounts (Admin, /admin: an \"Alumni Members\"      
                  Superadmin, Content Editor,  section (registration, membership  
                  etc.) appear mixed in the    status, dues/payments) and a       
                  same table.                  separate \"Staff & Roles\" section 
                                               (admin/superadmin/content-editor   
                                               accounts, permissions). Different  
                                               data model, different page,        
                                               different table.                   

  Roles &         Not confirmed whether        Define permissions per role:       **Critical**
  permissions     role-based access control    Superadmin (full access incl.      
                  (RBAC) currently limits what managing other staff), Admin       
                  each staff role can see/do.  (members, payments, events),       
                                               Content Editor (announcements,     
                                               gallery, events --- no access to   
                                               member payment/financial data or   
                                               staff management).                 

  Member-facing   Not confirmed whether alumni Ensure alumni-facing               **High**
  data isolation  members can ever see         account/dashboard views never      
                  staff-only fields (roles,    expose staff-only data, and        
                  permissions, internal        staff-management screens are only  
                  notes).                      reachable by Superadmin.           
  ----------------------------------------------------------------------------------------------

*This directly affects data integrity and trust: a member list that
includes internal staff accounts (or vice versa) risks the wrong people
being counted as members, wrong permissions being granted, and confusion
during payment verification (Section 3.1). Recommend this is scoped and
fixed before the payment-verification admin queue (3.1) is built, since
that queue depends on a clean separation between \"who is staff\" and
\"who is a member.\"*

# **4. Suggested Priority Order**

1.  Separate Alumni Members from Admin/Staff users in the backend and
    > admin UI (Section 3.8) --- foundational, affects everything else
    > in admin.

2.  Fix the password reset \"auth-callback-failed\" error (Section 3.7)
    > --- members currently cannot self-serve a password reset at all.

3.  Fix the Membership → Register mis-link (5-minute fix, immediate
    > value).

4.  Fix the two confirmed performance issues (oversized gallery images,
    > homepage videos) and run a Lighthouse/server-timing audit for the
    > rest (Section 3.6).

5.  Wire up Zelle + PayPal on Donations and Pay Dues, with the Pending →
    > Admin Verified flow (unblocks revenue collection).

6.  Fix registration confirmation email + member status states +
    > dashboard messaging.

7.  Fix header logged-in state.

8.  Mobile QA pass across nav, forms, and payment UI.

9.  Gallery slider/lightbox conversion.

10. CashApp (once handle confirmed) and, later, Stripe card payments as
    > Phase 2.

11. Full form-by-form QA checklist (Section 3.3) run before calling
    > launch-ready.

## **Implementation Plan & Tracked Tasks**

The following implementation plan converts the priority list above into
actionable engineering tasks. Each task is tracked in the session TODO
list so progress, in-progress work, and completed steps are visible to
the team. Early tasks are small, high-impact fixes; later tasks cover
payments, QA, and performance work required for a launch-ready site.

- Separate Alumni Members from Staff accounts and enforce RBAC in the
    admin UI and backend (foundational).
- Fix the password-reset auth callback so members can set new passwords.
- Repair the Membership page `Register Now` CTA to point to `/register`.
- Optimize gallery images and homepage videos; add responsive sizes.
- Wire up Zelle and PayPal manual-payment flows (Phase 1).
- Add a Payments Pending queue and admin "Mark Verified" action.
- Implement member status lifecycle and confirmation emails.
- Fix header and navigation state for logged-in members.
- Conduct a mobile QA pass across nav, forms, and payments.
- Convert gallery to a mobile-friendly lightbox/slider.
- Add CashApp (once handle provided); plan Stripe card payments for
    Phase 2.
- Run a full forms QA checklist and address failures.
- Run Lighthouse and server profiling; prioritize perf work.
- Configure outbound transactional email for confirmations and receipts.
- Implement admin roles and permissions (RBAC) for staff accounts.
- Produce documentation and a post-launch handoff checklist.

Progress for these tasks is recorded in the session TODO list and will
be updated as each task is started and completed.

# **5. Out of Scope for This Phase**

-   Rewriting existing page copy/content.

-   A new visual design system or rebrand.

-   Stripe/card payments (deferred to Phase 2 pending a connected,
    > tested Stripe account).

-   Publishing bank account/routing numbers publicly (see 3.1.1
    > recommendation).
