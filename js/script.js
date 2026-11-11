'use strict';
const body=document.body;
const currentPage=body.dataset.page;
document.querySelectorAll('nav a[data-page]').forEach(link=> {
    if(link.dataset.page===currentPage)link.setAttribute('aria-current','page')
}
);
const themeButton=document.querySelector('.theme-toggle');
try {
    if(localStorage.getItem('jn-theme')==='dark')body.classList.add('dark')
}
catch(e) {
}
function updateThemeLabel() {
    themeButton.setAttribute('aria-label',body.classList.contains('dark')?'Switch to light theme':'Switch to dark theme')
}
updateThemeLabel();
themeButton.addEventListener('click',()=> {
    body.classList.toggle('dark');updateThemeLabel();try {
        localStorage.setItem('jn-theme',body.classList.contains('dark')?'dark':'light')
    }
    catch(e) {
    }
}
);
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#site-nav');
menuButton.addEventListener('click',()=> {
    const isOpen=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(isOpen))
}
);
document.querySelector('#year').textContent=new Date().getFullYear();
const filters=document.querySelectorAll('.filter');
if(filters.length) {
    const rows=document.querySelectorAll('tbody tr[data-category]');
    const count=document.querySelector('#filter-count');
    filters.forEach(button=>button.addEventListener('click',()=> {
        const selected=button.dataset.filter;filters.forEach(b=> {
            b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))
        }
        );let visible=0;rows.forEach(row=> {
            const show=selected==='all'||row.dataset.category===selected;row.hidden=!show;if(show)visible++
        }
        );count.textContent=`Showing ${visible} skill${visible===1?'':'s'}`
    }
    ))
}
const form=document.querySelector('#contact-form');
if(form) {
    const fields=['name','email','message'];
    const validators= {
        name:v=>v.trim().length>=2?'':'Please enter at least 2 characters.',email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())?'':'Please enter a valid email address.',message:v=>v.trim().length>=10?'':'Please write at least 10 characters.'
    }
    ;
    function validate(id) {
        const input=document.getElementById(id);
        const message=validators[id](input.value);
        document.getElementById(id+'-error').textContent=message;
        input.setAttribute('aria-invalid',String(Boolean(message)));
        return !message
    }
    fields.forEach(id=> {
        document.getElementById(id).addEventListener('input',()=> {
            if(document.getElementById(id).hasAttribute('aria-invalid'))validate(id)
        }
        )
    }
    );
    form.addEventListener('submit',async event=> {
        event.preventDefault();const valid=fields.map(validate).every(Boolean);const status=document.getElementById('form-status');const submit=form.querySelector('[type="submit"]');status.classList.remove('success');if(!valid) {
            status.textContent='Please correct the highlighted fields and try again.';const first=fields.find(id=>document.getElementById(id).getAttribute('aria-invalid')==='true');document.getElementById(first).focus();return
        }
        if(form.action.includes('YOUR_FORM_ID')) {
            status.textContent='Setup required: replace YOUR_FORM_ID in contact.html with your Formspree form ID before sending messages.';return
        }
        submit.disabled=true;submit.textContent='Sending…';status.textContent='Sending your message…';try {
            const response=await fetch(form.action, {
                method:'POST',body:new FormData(form),headers: {
                    'Accept':'application/json'
                }
            }
            );if(!response.ok)throw new Error('Submission failed');status.classList.add('success');status.textContent='Thanks! Your message was sent successfully.';form.reset();fields.forEach(id=>document.getElementById(id).removeAttribute('aria-invalid'))
        }
        catch(error) {
            status.textContent='Sorry, your message could not be sent. Please try again later.'
        }
        finally {
            submit.disabled=false;submit.innerHTML='Send message <span aria-hidden="true">↗</span>'
        }
    }
    )
}
