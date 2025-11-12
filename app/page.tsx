"use client"

import type React from "react"

import { useState } from "react"
import {
  Leaf,
  ArrowRight,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Activity,
  Heart,
  Award,
  ChevronLeft,
  Upload,
  CheckCircle2,
  Calculator,
  Edit,
} from "lucide-react"

const recipes = [
  {
    id: 1,
    name: "Pollo a la Plancha con Puré de Papa y Verduras al Vapor",
    image: "/0191e788-9eb6-7ed1-bc69-39875195ce8e.jpeg",
    description:
      "Este plato combina la jugosidad del pollo a la plancha con un suave puré de papa y verduras al vapor, creando una comida equilibrada y deliciosa.",
    ingredients: [
      "4 pechugas de pollo",
      "2 cucharadas aceite de oliva",
      "Sal al gusto",
      "4 papas medianas",
      "½ taza de leche",
      "2 cucharadas mantequilla",
      "1 zanahoria",
      "1 taza de brócoli",
    ],
    steps: [
      "Lava y seca todas las verduras a fondo",
      "Combina las verduras mixtas en un tazón grande",
      "Agrega tomates cherry, pepino, cebolla y pimiento",
      "En un tazón pequeño, mezcla el aceite de oliva y vinagre balsámico",
      "Rocía el aderezo sobre la ensalada y mezcla suavemente",
      "Sazona con sal y pimienta al gusto",
      "Sirve inmediatamente y disfruta",
    ],
  },
  {
    id: 2,
    name: "Bowl de Smoothie Verde Energizante",
    image: "/vibrant-green-smoothie-bowl-with-berries-and-grano.jpg",
    description:
      "Repleto de espinacas, bayas y granola. Un desayuno refrescante que energiza tu día con nutrientes esenciales.",
    ingredients: [
      "2 tazas de espinacas frescas",
      "1 plátano, congelado",
      "1/2 taza de bayas mixtas",
      "1/2 taza de leche de almendras",
      "1 cucharada de semillas de chía",
      "1/4 taza de granola",
      "Bayas frescas para decorar",
      "1 cucharada de miel (opcional)",
    ],
    steps: [
      "Agrega espinacas, plátano congelado y bayas a la licuadora",
      "Vierte la leche de almendras",
      "Licúa a alta velocidad hasta obtener una mezcla suave y cremosa",
      "Vierte en un tazón",
      "Decora con granola, bayas frescas y semillas de chía",
      "Rocía con miel si lo deseas",
      "Sirve inmediatamente",
    ],
  },
  {
    id: 3,
    name: "Bowl de Pollo a la Parrilla con Proteínas",
    image: "/grilled-chicken-salad-with-mixed-greens-avocado-an.jpg",
    description:
      "Pollo tierno a la parrilla con verduras mixtas, aguacate y un aderezo cítrico. Alto en proteínas e increíblemente satisfactorio.",
    ingredients: [
      "2 pechugas de pollo",
      "2 tazas de verduras mixtas",
      "1 aguacate, rebanado",
      "1/2 taza de tomates cherry",
      "1/4 taza de granos de maíz",
      "2 cucharadas de aceite de oliva",
      "1 lima, exprimida",
      "1 cucharadita de comino",
      "Sal y pimienta al gusto",
    ],
    steps: [
      "Sazona las pechugas de pollo con comino, sal y pimienta",
      "Calienta la parrilla o sartén para parrilla a fuego medio-alto",
      "Asa el pollo durante 6-7 minutos por lado hasta que esté completamente cocido",
      "Deja reposar el pollo durante 5 minutos, luego rebana",
      "Coloca las verduras mixtas en un tazón",
      "Agrega el pollo rebanado, aguacate, tomates y maíz encima",
      "Rocía con aceite de oliva y jugo de lima",
      "Sirve tibio y disfruta",
    ],
  },
]

export default function HealthyRecipesWelcome() {
  const [currentScreen, setCurrentScreen] = useState<
    "welcome" | "recipes" | "form" | "health" | "profile" | "achievements" | "recipeDetail" | "bmi" | "editProfile"
  >("welcome")
  const [isLoginMode, setIsLoginMode] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null)
  const [completedRecipes, setCompletedRecipes] = useState<number[]>([])
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  // Health form data state
  const [healthData, setHealthData] = useState({
    age: "",
    weight: "",
    height: "",
    healthIssues: "",
  })

  const [bmiData, setBmiData] = useState({
    weight: "",
    height: "",
  })

  const handleGoToRecipes = () => {
    setCurrentScreen("recipes")
  }

  const handleRegisterNow = () => {
    setCurrentScreen("form")
  }

  const handleViewRecipe = (recipeId: number) => {
    setSelectedRecipeId(recipeId)
    setUploadedPhoto(null)
    setCurrentScreen("recipeDetail")
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedPhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCompleteRecipe = () => {
    if (selectedRecipeId && !completedRecipes.includes(selectedRecipeId)) {
      setCompletedRecipes([...completedRecipes, selectedRecipeId])
      alert("Recipe marked as complete! Check your achievements.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Health form input handler
  const handleHealthInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHealthData({
      ...healthData,
      [e.target.name]: e.target.value,
    })
  }

  const handleBmiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBmiData({
      ...bmiData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent, mode: "login" | "register") => {
    e.preventDefault()
    console.log(`${mode} submitted:`, formData)

    if (mode === "register") {
      setIsLoggedIn(true)
      // After successful registration, go to health form
      setCurrentScreen("health")
    } else {
      setIsLoggedIn(true)
      // For login, you might redirect to recipes or dashboard
      console.log("Login successful")
      setCurrentScreen("recipes")
    }
  }

  // Health form submit handler
  const handleHealthSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Health information submitted:", healthData)
    console.log("Complete user profile:", { ...formData, ...healthData })
    setCurrentScreen("profile")
  }

  const handleAchievements = () => {
    setCurrentScreen("achievements")
  }

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode)
  }

  const handleGoToBmi = () => {
    if (!isLoggedIn) {
      setShowRegisterModal(true)
    } else {
      setCurrentScreen("bmi")
    }
  }

  const handleRegisterFromModal = () => {
    setShowRegisterModal(false)
    setCurrentScreen("form")
  }

  const completedDays = [1, 2, 3, 4, 5]

  return (
    <div className="min-h-screen bg-background">
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-300">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowRegisterModal(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-card rounded-3xl shadow-2xl border border-border/50 animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-accent hover:bg-accent/80 flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Modal Header */}
            <div className="from-primary/10 to-primary/5 px-8 py-8 text-center border-b border-border/50">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                  <Lock className="w-9 h-9 text-primary-foreground" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3 text-balance">¿Quieres usar el IMC?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                Regístrate para esto y desbloquear todas las otras funcionalidades para mejorar tu alimentación y salud!
              </p>
            </div>

            {/* Modal Body */}
            <div className="px-8 py-8">
              <button
                onClick={handleRegisterFromModal}
                className="w-full px-6 py-5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-3"
              >
                <User className="w-6 h-6" />
                Regístrate aquí
                <ArrowRight className="w-6 h-6" />
              </button>

              <p className="text-xs text-muted-foreground text-center mt-6 leading-relaxed">
                Únete a nuestra comunidad y accede a todas las funcionalidades de salud y nutrición
              </p>
            </div>
          </div>
        </div>
      )}

      {isLoggedIn && currentScreen !== "welcome" && currentScreen !== "form" && currentScreen !== "health" && (
        <button
          onClick={() => setCurrentScreen("profile")}
          className="fixed top-4 right-4 z-50 w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center group"
          title="Go to Profile"
        >
          <User className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Welcome Screen - Shows initially */}
      {currentScreen === "welcome" && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 animate-in fade-in duration-700">
          <div className="max-w-md w-full text-center space-y-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <Leaf className="w-9 h-9 text-primary-foreground" />
              </div>
            </div>

            {/* Welcome Message */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-foreground leading-tight text-balance">Bienvenido a Nexo!</h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Tu ruta para un mejor estilo de vida nutricional.
              </p>
            </div>

            <button
              onClick={handleGoToRecipes}
              className="group w-full max-w-sm mx-auto px-8 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-3"
            >
              Ir a las recetas
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Decorative Element */}
            <div className="pt-8">
              <p className="text-sm text-muted-foreground">Descubre deliciosas recetas saludables.</p>
            </div>
          </div>
        </div>
      )}

      {currentScreen === "recipes" && (
        <div className="min-h-screen px-4 py-8 animate-in fade-in slide-in-from-right-6 duration-500">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <Leaf className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {isLoggedIn ? "Tus recetas saludables" : "Lista de recetas"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isLoggedIn ? "Todas las recetas disponibles personalizadas para ti" : "Encuentra tu receta preferida!"}
              </p>
            </div>

            {/* Recipe Cards */}
            <div className="space-y-4 mb-8">
              {recipes.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => handleViewRecipe(recipe.id)}
                  className="w-full text-left bg-card rounded-2xl shadow-md overflow-hidden border border-border/50 hover:shadow-lg hover:scale-[1.02] transition-all active:scale-[0.98]"
                >
                  <img
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-foreground">{recipe.name}</h3>
                      {completedRecipes.includes(recipe.id) && <CheckCircle2 className="w-6 h-6 text-primary " />}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{recipe.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {!isLoggedIn && (
              <div className=" from-primary/10 to-primary/5 rounded-2xl p-6 text-center border border-border/50 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-foreground mb-3 text-balance">
                  ¿Quieres más recetas como estas?
                </h2>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed text-pretty">
                  Registrate y crea tu dieta personalizada basada en tus objetivos con tu salud.
                </p>
                <button
                  onClick={handleRegisterNow}
                  className="w-full max-w-xs mx-auto px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-base hover:opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                  Registrarte ahora
                </button>
              </div>
            )}

            {/* BMI Calculator Section */}
            <div className="mt-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-3xl p-8 text-center border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                  <Calculator className="w-9 h-9 text-primary-foreground" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-3 text-balance">
                ¿Quieres calcular tu Índice de Masa Corporal?
              </h2>

              <p className="text-base text-muted-foreground mb-6 leading-relaxed max-w-md mx-auto text-pretty">
                Conoce tu IMC y da el primer paso hacia tus objetivos de salud
              </p>

              <button
                onClick={handleGoToBmi}
                className="group px-8 py-5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl active:scale-95 inline-flex items-center justify-center gap-3"
              >
                <Calculator className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                ¡Haz clic aquí para calcular y alcanzar tus metas de salud!
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-6 pt-6 border-t border-primary/20">
                <p className="text-xs text-muted-foreground">
                  El IMC es una herramienta útil para evaluar tu peso en relación con tu altura
                </p>
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={() => setCurrentScreen("welcome")}
              className="mt-6 w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Volver a la pagina de inicio
            </button>
          </div>
        </div>
      )}

      {currentScreen === "recipeDetail" && selectedRecipeId && (
        <div className="min-h-screen px-4 py-8 animate-in fade-in slide-in-from-right-6 duration-500">
          <div className="max-w-2xl mx-auto">
            {(() => {
              const recipe = recipes.find((r) => r.id === selectedRecipeId)
              if (!recipe) return null
              const isCompleted = completedRecipes.includes(recipe.id)

              return (
                <>
                  {/* Back Button */}
                  <button
                    onClick={() => setCurrentScreen("recipes")}
                    className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm font-semibold">Volver a las recetas</span>
                  </button>

                  {/* Recipe Header */}
                  <div className="bg-card rounded-3xl shadow-xl overflow-hidden border border-border/50 mb-6">
                    <img
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h1 className="text-2xl font-bold text-foreground text-balance">{recipe.name}</h1>
                        {isCompleted && (
                          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full ">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            <span className="text-xs font-bold text-primary">Completed</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{recipe.description}</p>
                    </div>
                  </div>

                  {/* Ingredients Section */}
                  <div className="bg-card rounded-3xl shadow-xl overflow-hidden border border-border/50 mb-6">
                    <div className=" from-primary/10 to-primary/5 px-6 py-4 border-b border-border/50">
                      <h2 className="text-lg font-bold text-foreground">Ingredients</h2>
                    </div>
                    <div className="px-6 py-5">
                      <ul className="space-y-3">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 "></div>
                            <span className="text-sm text-foreground leading-relaxed">{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Preparation Steps Section */}
                  <div className="bg-card rounded-3xl shadow-xl overflow-hidden border border-border/50 mb-6">
                    <div className=" from-primary/10 to-primary/5 px-6 py-4 border-b border-border/50">
                      <h2 className="text-lg font-bold text-foreground">Preparation Steps</h2>
                    </div>
                    <div className="px-6 py-5">
                      <ol className="space-y-4">
                        {recipe.steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center ">
                              <span className="text-sm font-bold text-primary-foreground">{index + 1}</span>
                            </div>
                            <span className="text-sm text-foreground leading-relaxed pt-1">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Completion Section */}
                  {!isCompleted && (
                    <div className="bg-card rounded-3xl shadow-xl overflow-hidden border border-border/50 mb-6">
                      <div className=" from-primary/10 to-primary/5 px-6 py-4 border-b border-border/50">
                        <h2 className="text-lg font-bold text-foreground">Mark as Complete</h2>
                        <p className="text-xs text-muted-foreground mt-1">Upload a photo of your completed recipe</p>
                      </div>
                      <div className="px-6 py-6">
                        {/* Photo Upload */}
                        <div className="mb-6">
                          <label htmlFor="recipePhoto" className="block w-full cursor-pointer">
                            <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors">
                              {uploadedPhoto ? (
                                <div className="space-y-3">
                                  <img
                                    src={uploadedPhoto || "/placeholder.svg"}
                                    alt="Uploaded recipe"
                                    className="w-full h-48 object-cover rounded-xl mx-auto"
                                  />
                                  <p className="text-sm font-semibold text-primary">Photo uploaded successfully!</p>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                    <Upload className="w-8 h-8 text-primary" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-foreground mb-1">Upload Photo</p>
                                    <p className="text-xs text-muted-foreground">
                                      Tap to select a photo from your device
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </label>
                          <input
                            type="file"
                            id="recipePhoto"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </div>

                        {/* Complete Button */}
                        <button
                          onClick={handleCompleteRecipe}
                          disabled={!uploadedPhoto}
                          className="w-full px-6 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                        >
                          <CheckCircle2 className="w-6 h-6" />
                          Complete Recipe
                        </button>
                        {!uploadedPhoto && (
                          <p className="text-xs text-muted-foreground text-center mt-3">
                            Please upload a photo to mark this recipe as complete
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {isCompleted && uploadedPhoto && (
                    <div className="bg-card rounded-3xl shadow-xl overflow-hidden border border-border/50 mb-6">
                      <div className=" from-primary/10 to-primary/5 px-6 py-4 border-b border-border/50">
                        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          Recipe Completed!
                        </h2>
                      </div>
                      <div className="px-6 py-6">
                        <img
                          src={uploadedPhoto || "/placeholder.svg"}
                          alt="Your completed recipe"
                          className="w-full h-64 object-cover rounded-xl mb-4"
                        />
                        <p className="text-sm text-muted-foreground text-center leading-relaxed">
                          Great job! This recipe has been added to your achievements.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )
            })()}
          </div>
        </div>
      )}

      {currentScreen === "form" && (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-6 duration-500">
            {/* Form Container */}
            <div className="bg-card/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-border/50">
              {/* Header */}
              <div className=" from-primary/10 to-primary/5 px-6 py-8 text-center border-b border-border/50">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <Leaf className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {isLoginMode ? "Bienvenido de vuelta" : "Registrate a Nexo"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {isLoginMode ? "Inicia sesión para ver tus recetas" : "Crea una cuenta para empezar"}
                </p>
              </div>

              {/* Form */}
              <div className="px-6 py-8">
                <form onSubmit={(e) => handleSubmit(e, isLoginMode ? "login" : "register")} className="space-y-5">
                  {/* Name Field - Only for Registration */}
                  {!isLoginMode && (
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-foreground block">
                        Nombre Completo
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Ingrese su nombre"
                          required={!isLoginMode}
                          className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground block">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Ingrese su correo"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-semibold text-foreground block">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Ingresar su contraseña"
                        required
                        className="w-full pl-12 pr-12 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-base hover:opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-95 mt-6"
                  >
                    {isLoginMode ? "Iniciar sesión" : "Registrar"}
                  </button>
                </form>

                {/* Toggle Mode */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {isLoginMode ? "Don't have an account?" : "¿Ya tiene una cueta?"}{" "}
                    <button onClick={toggleMode} className="text-primary font-semibold hover:underline transition-all">
                      {isLoginMode ? "Registrarse aqui" : "Inicie sesión aqui"}
                    </button>
                  </p>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-border/50 text-center">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Para continuar acepte los terminos y condiciones.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentScreen("recipes")}
              className="mt-6 w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Volver a la lista de recetas
            </button>
          </div>
        </div>
      )}

      {/* Health Information Form Screen */}
      {currentScreen === "health" && (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-6 duration-500">
            {/* Form Container */}
            <div className="bg-card/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-border/50">
              {/* Header */}
              <div className=" from-primary/10 to-primary/5 px-6 py-8 text-center border-b border-border/50">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <Heart className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Tu perfil de salud</h2>
                <p className="text-sm text-muted-foreground">Ayudanos a personalizar tus recetas</p>
              </div>

              {/* Form */}
              <div className="px-6 py-8">
                <form onSubmit={handleHealthSubmit} className="space-y-5">
                  {/* Age Field */}
                  <div className="space-y-2">
                    <label htmlFor="age" className="text-sm font-semibold text-foreground block">
                      Edad
                    </label>
                    <div className="relative">
                      <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={healthData.age}
                        onChange={handleHealthInputChange}
                        placeholder="Ingrese su edad"
                        min="1"
                        max="120"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  {/* Weight Field */}
                  <div className="space-y-2">
                    <label htmlFor="weight" className="text-sm font-semibold text-foreground block">
                      Peso (kg)
                    </label>
                    <div className="relative">
                      <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={healthData.weight}
                        onChange={handleHealthInputChange}
                        placeholder="Ingrese su peso en kilos (kg)"
                        min="1"
                        step="0.1"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  {/* Height Field */}
                  <div className="space-y-2">
                    <label htmlFor="height" className="text-sm font-semibold text-foreground block">
                      Estatura (cm)
                    </label>
                    <div className="relative">
                      <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="number"
                        id="height"
                        name="height"
                        value={healthData.height}
                        onChange={handleHealthInputChange}
                        placeholder="Ingrese su estatura en cm"
                        min="1"
                        step="0.1"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  {/* Health Issues Field */}
                  <div className="space-y-2">
                    <label htmlFor="healthIssues" className="text-sm font-semibold text-foreground block">
                      Problemas de salud (Opcional)
                    </label>
                    <textarea
                      id="healthIssues"
                      name="healthIssues"
                      value={healthData.healthIssues}
                      onChange={handleHealthInputChange}
                      placeholder="Dinos su problemas de salud (e.g., diabetes, hipertensión, alergias, etc)"
                      rows={4}
                      className="w-full px-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    />
                    <p className="text-xs text-muted-foreground">Esto nos ayuda para personalizar sus recetas.</p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-base hover:opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-95 mt-6"
                  >
                    Continuar
                  </button>
                </form>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-border/50 text-center">
                  <p className="text-xs text-muted-foreground leading-relaxed">Tu información es privada y segura.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentScreen("form")}
              className="mt-6 w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Volver al registro
            </button>
          </div>
        </div>
      )}

      {currentScreen === "profile" && (
        <div className="min-h-screen px-4 py-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-9 h-9 text-primary-foreground" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Mi Perfil</h1>
              <p className="text-sm text-muted-foreground">Bienvenido!, {formData.name}!</p>
            </div>

            {/* Profile Card */}
            <div className="bg-card/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-border/50 mb-6">
              <div className=" from-primary/10 to-primary/5 px-6 py-5 border-b border-border/50 flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">Información del usuario.</h2>
                <button
                  onClick={() => setCurrentScreen("editProfile")}
                  className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  <Edit className="w-4 h-4" />
                  Editar Información
                </button>
              </div>

              <div className="px-6 py-6 space-y-5">
                {/* Name */}
                <div className="flex items-start gap-4 pb-4 border-b border-border/30">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center ">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Nombre</p>
                    <p className="text-base font-semibold text-foreground">{formData.name || "No Registrado"}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 pb-4 border-b border-border/30">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center ">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      Correo Electrónico
                    </p>
                    <p className="text-base font-semibold text-foreground break-all">
                      {formData.email || "No Registrado"}
                    </p>
                  </div>
                </div>

                {/* Age */}
                <div className="flex items-start gap-4 pb-4 border-b border-border/30">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center ">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Edad</p>
                    <p className="text-base font-semibold text-foreground">{healthData.age} años</p>
                  </div>
                </div>

                {/* Weight */}
                <div className="flex items-start gap-4 pb-4 border-b border-border/30">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center ">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Peso</p>
                    <p className="text-base font-semibold text-foreground">{healthData.weight} kg</p>
                  </div>
                </div>

                {/* Height */}
                <div className="flex items-start gap-4 pb-4 border-b border-border/30">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center ">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Estatura</p>
                    <p className="text-base font-semibold text-foreground">{healthData.height} cm</p>
                  </div>
                </div>

                {/* Health Issues */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center ">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      Problemas de salud
                    </p>
                    <p className="text-base font-semibold text-foreground leading-relaxed">
                      {healthData.healthIssues || "No especificados"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Button */}
            <button
              onClick={handleAchievements}
              className="w-full px-6 py-5 bg-linear-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl font-bold text-base hover:opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-3"
            >
              <Award className="w-6 h-6" />
              Mira tus logros!
            </button>

            {/* Additional Actions */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() => setCurrentScreen("recipes")}
                className="w-full px-6 py-4 bg-card border border-border rounded-xl font-semibold text-foreground hover:bg-accent transition-all"
              >
                Lista de Recetas
              </button>
            </div>

            {/* Info Text */}
            <div className="mt-8 text-center">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tu perfil ya esta completado! Empieza a explorar las recetas basadas en tu salud.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Achievements Screen */}
      {currentScreen === "achievements" && (
        <div className="min-h-screen px-4 py-8 animate-in fade-in slide-in-from-right-6 duration-500">
          <div className="w-full max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <Award className="w-9 h-9 text-primary-foreground" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Tus Logros</h1>
              <p className="text-sm text-muted-foreground">Sigue tu progreso y celebra tus logros.</p>
            </div>

            {/* Login Streak Section */}
            <div className="bg-card/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-border/50 mb-6">
              <div className=" from-primary/10 to-primary/5 px-6 py-5 border-b border-border/50">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Dias Registrados / Racha de inicio sesión
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Inicia sesión todos los dias para mejorar tu racha!
                </p>
              </div>

              <div className="px-6 py-6">
                {/* Current Streak Stats */}
                <div className="flex items-center justify-center gap-8 mb-6 pb-6 border-b border-border/30">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">{completedDays.length}</p>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mt-1">
                      Dias completados
                    </p>
                  </div>
                  <div className="w-px h-12 bg-border"></div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-foreground">{31 - completedDays.length}</p>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mt-1">
                      Dias faltantes
                    </p>
                  </div>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-3">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                    const isCompleted = completedDays.includes(day)
                    return (
                      <div key={day} className="flex flex-col items-center gap-2">
                        <div
                          className={`
                            w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm
                            transition-all duration-300 cursor-pointer
                            ${
                              isCompleted
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                                : "bg-accent border-2 border-border text-muted-foreground hover:border-primary/50"
                            }
                          `}
                          title={`Day ${day}${isCompleted ? " - Completed" : ""}`}
                        >
                          {day}
                        </div>
                        {isCompleted && <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>}
                      </div>
                    )
                  })}
                </div>

                {/* Progress Bar */}
                <div className="mt-6 pt-6 border-t border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-foreground">Barra de progreso</p>
                    <p className="text-sm font-bold text-primary">{Math.round((completedDays.length / 31) * 100)}%</p>
                  </div>
                  <div className="w-full h-3 bg-accent rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-primary to-primary/80 rounded-full transition-all duration-500"
                      style={{ width: `${(completedDays.length / 31) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-border/50 mb-6">
              <div className=" from-primary/10 to-primary/5 px-6 py-5 border-b border-border/50">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-primary" />
                  Recetas completadas
                </h2>
                <p className="text-xs text-muted-foreground mt-1">Mira las recetas que has completado</p>
              </div>
              <div className="px-6 py-8">
                {completedRecipes.length > 0 ? (
                  <div>
                    <div className="text-center mb-6">
                      <p className="text-5xl font-bold text-primary mb-2">{completedRecipes.length}</p>
                      <p className="text-sm text-muted-foreground font-semibold">
                        {completedRecipes.length === 1 ? "Recipe Completed" : "Recipes Completed"}
                      </p>
                    </div>
                    <div className="space-y-3">
                      {completedRecipes.map((recipeId) => {
                        const recipe = recipes.find((r) => r.id === recipeId)
                        if (!recipe) return null
                        return (
                          <div
                            key={recipeId}
                            className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-primary/20"
                          >
                            <CheckCircle2 className="w-5 h-5 text-primary " />
                            <span className="text-sm font-semibold text-foreground">{recipe.name}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <Leaf className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground mb-2">Recetas aun no completadas</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      Empieza a cocinar y marca las recetas que hayas finalizado
                    </p>
                    <button
                      onClick={() => setCurrentScreen("recipes")}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-all"
                    >
                      Lista de recetas
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Placeholder: Goals Reached Section */}
            <div className="bg-card/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-border/50 mb-6">
              <div className=" from-primary/10 to-primary/5 px-6 py-5 border-b border-border/50">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Objetivos de salud
                </h2>
                <p className="text-xs text-muted-foreground mt-1">Celebra tus objetivos de salud</p>
              </div>
              <div className="px-6 py-8 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-foreground mb-2">Proximamente</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Guarda y celebra tus objetivos logrados con tu salud!
                </p>
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={() => setCurrentScreen("profile")}
              className="w-full px-6 py-4 bg-card border border-border rounded-xl font-semibold text-foreground hover:bg-accent transition-all flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Volver al perfil
            </button>

            {/* Motivational Message */}
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Inicia sesión todos los días no solo para mejorar la racha, si no para también mejorar en su salud!
              </p>
            </div>
          </div>
        </div>
      )}

      {currentScreen === "bmi" && (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-6 duration-500">
            {/* BMI Form Container */}
            <div className="bg-card/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-border/50">
              {/* Header */}
              <div className="from-primary/10 to-primary/5 px-6 py-8 text-center border-b border-border/50">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <Calculator className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Calcula tu Índice de Masa Corporal (IMC)</h2>
                <p className="text-sm text-muted-foreground">Ingresa tu peso y estatura para calcular tu IMC</p>
              </div>

              {/* BMI Information */}
              <div className="px-6 py-5 bg-primary/5 border-b border-border/50">
                <h3 className="text-sm font-bold text-foreground mb-2">¿Qué es el IMC?</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  El Índice de Masa Corporal (IMC) es una medida utilizada para evaluar si una persona tiene un peso
                  saludable en relación con su estatura. Es una herramienta importante para entender tu salud general y
                  establecer metas realistas de bienestar.
                </p>
              </div>

              {/* Form */}
              <div className="px-6 py-8">
                <form className="space-y-5">
                  {/* Weight Field */}
                  <div className="space-y-2">
                    <label htmlFor="bmiWeight" className="text-sm font-semibold text-foreground block">
                      Peso
                    </label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="number"
                          id="bmiWeight"
                          name="weight"
                          value={bmiData.weight}
                          onChange={handleBmiInputChange}
                          placeholder="Ingresa tu peso"
                          min="1"
                          step="0.1"
                          className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        />
                      </div>
                      <div className="flex items-center px-4 py-3.5 bg-accent border border-border rounded-xl">
                        <span className="text-sm font-semibold text-foreground">kg</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Ingresa tu peso en kilogramos</p>
                  </div>

                  {/* Height Field */}
                  <div className="space-y-2">
                    <label htmlFor="bmiHeight" className="text-sm font-semibold text-foreground block">
                      Estatura
                    </label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="number"
                          id="bmiHeight"
                          name="height"
                          value={bmiData.height}
                          onChange={handleBmiInputChange}
                          placeholder="Ingresa tu estatura"
                          min="1"
                          step="0.01"
                          className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        />
                      </div>
                      <div className="flex items-center px-4 py-3.5 bg-accent border border-border rounded-xl">
                        <span className="text-sm font-semibold text-foreground">m</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Ingresa tu estatura en metros (ej: 1.75)</p>
                  </div>

                  {/* Calculate Button - No functionality yet */}
                  <button
                    type="button"
                    className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-base hover:opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-95 mt-6 flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-5 h-5" />
                    Calcular IMC
                  </button>
                </form>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <h4 className="text-xs font-bold text-foreground mb-3 uppercase tracking-wide">Categorías de IMC</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Bajo peso</span>
                      <span className="font-semibold text-foreground">Menor a 18.5</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Peso normal</span>
                      <span className="font-semibold text-foreground">18.5 - 24.9</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Sobrepeso</span>
                      <span className="font-semibold text-foreground">25 - 29.9</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Obesidad</span>
                      <span className="font-semibold text-foreground">30 o mayor</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={() => setCurrentScreen("recipes")}
              className="mt-6 w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Volver a las recetas
            </button>
          </div>
        </div>
      )}

      {currentScreen === "editProfile" && (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-6 duration-500">
            {/* Edit Form Container */}
            <div className="bg-card/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-border/50">
              {/* Header */}
              <div className="from-primary/10 to-primary/5 px-6 py-8 text-center border-b border-border/50">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <Edit className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Editar tu Perfil</h2>
                <p className="text-sm text-muted-foreground">Actualiza tu información personal y de salud</p>
              </div>

              {/* Form */}
              <div className="px-6 py-8">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    console.log("Profile updated:", { ...formData, ...healthData })
                    alert("Perfil actualizado exitosamente!")
                    setCurrentScreen("profile")
                  }}
                  className="space-y-5"
                >
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="editName" className="text-sm font-semibold text-foreground block">
                      Nombre Completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        id="editName"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ingrese su nombre"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="editEmail" className="text-sm font-semibold text-foreground block">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        id="editEmail"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Ingrese su correo"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="editPassword" className="text-sm font-semibold text-foreground block">
                      Nueva Contraseña (Opcional)
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="editPassword"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Dejar en blanco para mantener actual"
                        className="w-full pl-12 pr-12 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Age Field */}
                  <div className="space-y-2">
                    <label htmlFor="editAge" className="text-sm font-semibold text-foreground block">
                      Edad
                    </label>
                    <div className="relative">
                      <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="number"
                        id="editAge"
                        name="age"
                        value={healthData.age}
                        onChange={handleHealthInputChange}
                        placeholder="Ingrese su edad"
                        min="1"
                        max="120"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  {/* Weight Field */}
                  <div className="space-y-2">
                    <label htmlFor="editWeight" className="text-sm font-semibold text-foreground block">
                      Peso (kg)
                    </label>
                    <div className="relative">
                      <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="number"
                        id="editWeight"
                        name="weight"
                        value={healthData.weight}
                        onChange={handleHealthInputChange}
                        placeholder="Ingrese su peso en kilos (kg)"
                        min="1"
                        step="0.1"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  {/* Height Field */}
                  <div className="space-y-2">
                    <label htmlFor="editHeight" className="text-sm font-semibold text-foreground block">
                      Estatura (cm)
                    </label>
                    <div className="relative">
                      <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="number"
                        id="editHeight"
                        name="height"
                        value={healthData.height}
                        onChange={handleHealthInputChange}
                        placeholder="Ingrese su estatura en cm"
                        min="1"
                        step="0.1"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  {/* Health Issues Field */}
                  <div className="space-y-2">
                    <label htmlFor="editHealthIssues" className="text-sm font-semibold text-foreground block">
                      Problemas de salud (Opcional)
                    </label>
                    <textarea
                      id="editHealthIssues"
                      name="healthIssues"
                      value={healthData.healthIssues}
                      onChange={handleHealthInputChange}
                      placeholder="Dinos su problemas de salud"
                      rows={4}
                      className="w-full px-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setCurrentScreen("profile")}
                      className="flex-1 px-6 py-4 bg-accent border border-border rounded-xl font-semibold text-foreground hover:bg-accent/80 transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-base hover:opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-95"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </form>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-border/50 text-center">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Tus cambios se guardarán de forma segura
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
