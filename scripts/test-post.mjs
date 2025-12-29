
async function test() {
    try {
        const res = await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'Debug Post',
                slug: 'debug-post-' + Date.now(),
                content: 'Debug content',
                type: 'BLOG',
                status: 'DRAFT',
                author: 'Test Agent'
            })
        });

        console.log('Status:', res.status);
        const data = await res.json();
        console.log('Response:', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Script error:', err);
    }
}

test();
