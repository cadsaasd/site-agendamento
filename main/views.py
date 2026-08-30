from django.shortcuts import render

# Create your views here.
def home(request):
    services = [
        {
            "nome": "Manicure",
            "descricao": "Cuidado completo das unhas",
            "duracao": 40,
            "preco": 30,
        },
        {
            "nome": "Pedicure",
            "descricao": "Cuidados e esmaltação dos pés",
            "duracao": 50,
            "preco": 40,
        },
        {
            "nome": "Alongamento",
            "descricao": "Alongamento personalizado das unhas",
            "duracao": 90,
            "preco": 100,
        },
        
               
    ]

    return render(request, 'main/pages/home.html',{
        "services": services
    })