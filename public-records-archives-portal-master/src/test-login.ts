import fs from 'fs'

async function testLogin() {
    console.log('Testing login...')
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'admin',
                password: 'admin123'
            }),
        })

        const data = await response.json()
        console.log('Data received:', data)
        fs.writeFileSync('C:\\Users\\Mai Shaen\\Desktop\\Projects\\public-records-archives-portal-master\\public-records-archives-portal-master\\login-result.json', JSON.stringify(data, null, 2))
    } catch (err: any) {
        console.error('Error:', err.message)
        fs.writeFileSync('C:\\Users\\Mai Shaen\\Desktop\\Projects\\public-records-archives-portal-master\\public-records-archives-portal-master\\login-result-error.txt', err.message)
    }
}

testLogin()
